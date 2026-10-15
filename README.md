# 150 Jahre Kepi Webseite

Das ist das **offizielle Repository** der Webseite für die *150 Jahre Kepi* Ausstellung.<br>
Die Seite wird als statische Webseite mit [Eleventy](https://www.11ty.dev/) generiert.

## Technische Details

Diese Webseite basiert auf dem **Static Site Generator** [Eleventy](https://www.11ty.dev/).<br>
Für das Styling kommt [SASS](https://sass-lang.com/) zum Einsatz, als JavaScript runtime wird [Bun](https://bun.com/) bevorzugt.

> Alternativ sollte auch [NodeJS](https://nodejs.org/) funktionieren, dies wird aber nicht offiziell unterstützt oder dokumentiert.

## Einrichtung

Um das Projekt zu verwenden, wird eine funktionsfähige Installation von [Bun](https://bun.com/get) benötigt.

1. Abhängigkeiten installieren
    ```bash
    bun i
    ```

2. Lokalen Entwicklungsserver starten
    ```bash
    bunx @11ty/eleventy --serve
    ```
    Dies startet einen lokalen Server unter [localhost:8080](http://127.0.0.1:8080).<br>
    Änderungen im Projekt werden automatisch erkannt und neu erstellt.

## Lizenzierung & Urheberrecht

- **Quellcode:** Die 11ty-Konfiguration, Build-Skripte und Template-Dateien in diesem Repository stehen unter der Mozilla Public License 2.0 (MPL-2.0). Details finden Sie in der Datei LICENSE.

- **Artikel & Texte:** Alle redaktionellen Inhalte im Ordner articles/ unterliegen dem Urheberrecht der Geschichte-AG des Johannes Kepler Gymnasiums Reutlingen. Alle Rechte vorbehalten. Die Inhalte fallen ausdrücklich nicht unter die MPL-Lizenz.

- **Bilder & Medien:** Alle Bilder und weitere Medien im Ordner sowie articles/static/media/ bleiben Eigentum der jeweiligen Rechteinhaber (wie in den jeweiligen Artikeln angegeben) sofern nicht explizit anders angegeben. Alle Rechte vorbehalten.

- **Schriftarten:** Die Schriftart B612 im Ordner articles/static/fonts/B612/ ist unter der SIL Open Font License 1.1 lizenziert.
