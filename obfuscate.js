/* This Source Code Form is subject to the terms of the Mozilla Public 
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { promises as fs } from "node:fs";
import path from "node:path";
import QRCode from "qrcode";

const SRC_DIR = path.resolve("site");
const DEST_DIR = path.resolve("site-obf");
const QR_DIR = path.resolve("qr-codes");
const copiedFiles = new Set();

async function ensureDir(p) {
    await fs.mkdir(p, { recursive: true });
}

async function copyFile(src, dest) {
    if (copiedFiles.has(dest)) {
        throw new Error(`Duplicate file: ${dest}`);
    }
    copiedFiles.add(dest);
    await fs.copyFile(src, dest);
}

async function copyDir(src, dest) {
    await ensureDir(dest);
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await copyFile(srcPath, destPath);
        }
    }
}

async function hash(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const buf = await crypto.subtle.digest("SHA-256", data);

    const view = new DataView(buf);
    const int32 = view.getUint32(0, false);

    const base36 = int32.toString(36).slice(-4);
    return base36.padStart(4, "0");
}

async function genQr(path, data) {
    try {
        await QRCode.toFile(path, `https://150.jkg-rt.de/${data}`, {
            type: "svg",
            errorCorrectionLevel: "M",
            margin: 2,
            width: 256,
        });
    } catch (err) {
        console.error("Failed to generate QR code:", err);
        process.exit(1);
    }
}

export default async function build() {
    try {
        await fs.rm(DEST_DIR, { recursive: true });
    } catch (err) { }
    try {
        await fs.rm(QR_DIR, { recursive: true });
    } catch (err) { }
    await ensureDir(DEST_DIR);
    await ensureDir(QR_DIR);

    const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const srcPath = path.join(SRC_DIR, entry.name);

        if (!/^p[0-9]+q[0-9]+-/.test(entry.name)) {
            const destPath = path.join(DEST_DIR, entry.name);
            await copyDir(srcPath, destPath);
            if (!(await fs.readdir(srcPath, { withFileTypes: true })).find((file) => file.name === "index.html")) continue;
            const qrPath = path.join(QR_DIR, `${entry.name}.svg`);
            await genQr(qrPath, `${entry.name}`);
            continue;
        }

        const baseName = entry.name.split("-")[0];
        const hashName = await hash(baseName);
        const destPath = path.join(DEST_DIR, hashName);

        const plakatIndex = /p[0-9]+/.exec(baseName)[0].slice(1);
        const qrIndex = /q[0-9]+/.exec(baseName)[0].slice(1);
        const qrName = entry.name.split("-").slice(1).join("-");
        const qrParentDir = path.join(QR_DIR, `plakat-${plakatIndex}`);
        ensureDir(qrParentDir);
        const qrPath = path.join(qrParentDir, `qr-${qrIndex}-${qrName}.svg`);
        genQr(qrPath, `${hashName}`);

        await copyDir(srcPath, destPath);
    }

    await copyFile(path.join(SRC_DIR, "robots.txt"), path.join(DEST_DIR, "robots.txt"));
}
