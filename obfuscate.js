import { promises as fs } from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve("site");
const DEST_DIR = path.resolve("site-obf");
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

    const base36 = int32.toString(36).slice(-6);
    return base36.padStart(6, "0");
}

export default async function build() {
    try {
        await fs.rm(DEST_DIR, { recursive: true });
    } catch (err) { }
    await ensureDir(DEST_DIR);

    const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const srcPath = path.join(SRC_DIR, entry.name);

        if (!/^p[0-9]+q[0-9]+-/.test(entry.name)) {
            const destPath = path.join(DEST_DIR, entry.name);
            await copyDir(srcPath, destPath);
            continue;
        }

        const baseName = await hash(entry.name.split("-")[0]);
        const destPath = path.join(DEST_DIR, baseName);

        await copyDir(srcPath, destPath);
    }
}
