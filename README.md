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

## Inhalt der Seiten

Hier sollen Vorgaben zu den Inhalten aufgelistet werden.