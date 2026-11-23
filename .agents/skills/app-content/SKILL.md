---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Funktionsfamilien mit Schiebereglern“ (Mathematik, Klasse 9-10, Strang `mathematik/algebra`, nur Deutsch).
Er gehört zum Mathe-Epic lernapps/apps#402 (Auftrag #396). Die gemeinsamen Regeln des Epics gelten (Schreibweisen,
Aufgaben, Quellen, Sammel-Wiederholung); die wichtigsten stehen unten.

## Curriculum

- Jahrgang 9-10, Gymnasium; Orientierung allein die Lernlandkarte Mathematik (`https://lernapps.net/apps/map/mathematik.json`),
  die die Reihenfolge gibt. Hessischer Lehrplan und KMK-Standards wurden nicht geöffnet (nicht geprüft); der Inhalt
  stammt aus eigenen Herleitungen und eigenen Aufgaben.
- Voraussetzungen aus anderen Explainern stehen in Sammel-Wiederholungen, nie als Link in deren Apps.

## Competencies

Alle zehn Bausteine des Strangs `algebra`, Id und Seite (Datei in `src/<kapitel>/<seite>.yaml`):

- Kapitel 1 `parabeln`
  - `quadratische-funktionen` — „Ich kann quadratische Funktionen und ihre Parabeln beschreiben und zeichnen.“ — `normalparabel`, `scheitelform-allgemein`
  - `potenzfunktionen` — „Ich kann einfache Potenz- und Wurzelfunktionen mit ihren Graphen beschreiben.“ — `potenzfunktionen`
- Kapitel 2 `gleichungen`
  - `quadratische-gleichungen-einfach` — `einfache-gleichungen`
  - `quadratische-gleichungen` — `drei-wege`
  - `quadratische-funktionen-anwenden` — `anwendungen`
- Kapitel 3 `wachstum`
  - `zinseszins` — `zinseszins`
  - `exponentialfunktionen` — `exponentialfunktionen`
  - `logarithmen` — `logarithmen`
- Kapitel 4 `sinus`
  - `sinusfunktion` — `sinus-kosinus`
  - `periodische-vorgaenge` — `periodische-vorgaenge`

Jede Kapitelseite `recap` wiederholt die Voraussetzungen von außen: K1 `lineare-funktionen`, `klammern-binome`,
`potenzgesetze`, `funktionen-darstellung`; K2 `klammern-binome`, `quadratwurzeln`, `lineare-gleichungen`; K3
`zinsrechnung`, `prozent-veraenderung`, `potenzgesetze`, `funktionen-darstellung`; K4 `bogenmass`,
`funktionen-darstellung`. Mindestens drei Aufgaben je Baustein, steigend (erkennen, anwenden, neue Lage).

## Content structure

- Eine Seite = eine Kompetenz. Abschnitte mit festen Ids: `einstieg` (Ziel in Lernerworten, erste leichte Aufgabe),
  `modell` (die Darstellung in Worten, vor der ersten Aufgabe), `beispiel`, `uebung`. Höchstens 350 Wörter, höchstens
  vier Textblöcke in Folge, nach vier Blöcken etwas zum Ansehen oder Tun.
- Die tragende Darstellung ist die Dreifachansicht Term – Tabelle – Graph mit Reglern (`FunktionsGraph`): Der Term
  zeigt die Reglerwerte, die Tabelle die Funktionswerte, der Graph (SVG) mit der gestrichelten Grundform zum Vergleich.
- Recap-Seiten (`recap:`): Kopf „Das brauchst du für dieses Kapitel“, je Baustein ein Abschnitt (Überschrift = Name
  des Bausteins der Karte), Begriffe fett, Beispielkasten, ein `Kurztest` (nicht zu leicht, Hinweis zeigt den Weg),
  Satz mit der Kartenseite `https://lernapps.net/apps/map/mathematik/c/<id>/`; Schluss „Du bist bereit, wenn du …“.
  Das Schema erlaubt dort keine Aufgaben, deshalb die Komponente `Kurztest`.
- Keine `links:` an Aufgaben (Regeln Abschnitt 9). Keine Seite verweist in andere Apps.

## Terminology

- Namen der Karte gelten: Quadratische Funktionen, Scheitelform, allgemeine Form, Potenz- und Wurzelfunktionen,
  Zinseszins, Wachstumsfaktor, Exponentialfunktion, Logarithmus, Sinus- und Kosinusfunktion, Amplitude, Periode.
- Schreibweisen: Dezimalkomma; Minus `−` (U+2212); Malpunkt `·`, Doppelpunkt `:`; Prozent `15 %` mit geschütztem
  Leerzeichen; Einheiten `3 cm` mit geschütztem Leerzeichen; vierstellige Zahlen ohne Lücke, ab fünf Stellen
  Dreiergruppen mit schmalem geschütztem Leerzeichen; Variablen kursiv (`$x$`); Brüche gesetzt (`\frac`), nur in
  Rückmeldungen von Komponenten und `mistakes` als `a/b` (Laufzeitgrenze W28, im Plan gezählt). Titel ohne
  geschützte Leerzeichen und ohne gruppierte Zahlen (W16). Kein `\angle`, `\ldots`, `\overline`.
- Anrede „du“, kurze Sätze, kein „man“ in Arbeitsaufträgen. Einstiegsüberschrift: „Was du hier lernst“.
- Glossar: jeder Begriff aus einem anderen Explainer, der hier vorausgesetzt wird, einmal als `definition`
  (W34: danach nur fett).

## Exercise patterns

- *Ablesen/Deuten*: Graph und Regler gegeben, Wert oder Aussage gefragt (`single-choice`, `number`).
- *Passend einstellen*: Exercise-Komponente `FunktionsGraphAufgabe` (Seed gibt die Zielwerte, Regler einstellen,
  „Prüfen“ prüft mit Toleranz; Rückmeldung nennt den Fehlertyp, nie die Lösung).
- *Rechnen*: `generated` mit `mistakes` (Vorzeichen der Verschiebung, Zinssatz statt Faktor, + statt ·, falsche
  Wurzel, −b statt b in der Formel); Zahlen mit Rechenprobe im Build.
- *Begründen*: `true-false`/`multiple-choice` mit Grund in `info` jeder Option.
- Rückmeldung immer inhaltlich: richtig/nicht richtig, warum, Hinweis auf den Fehlertyp. Nach dem zweiten Fehlversuch
  der Lösungsweg (`steps`); Aufgaben wiederholbar mit neuen Zahlen. Kein Punktestand, kein Zeitdruck.

## Figures

- Graphen entstehen in der Komponente als SVG (Textalternative: Term, Scheitel/Eigenschaften, drei Beispielpunkte).
  Kurve voll, Grundform gestrichelt (zweites Merkmal neben der Farbe); Farben nur über die Variablen der Laufzeit
  (`--page-*`). Achsen mit Beschriftung `x` und `f(x)`; Fenster pro Block in `fenster`.
- Statische Bilder liegen in `src/images/` (eigene Zeichnung, `source: eigene Zeichnung`, `licence: CC0-1.0`),
  Textalternative und Bildunterschrift je Bild.
- Zinseszins-/Medikamenten-Szenen sind frei erfundene Fälle ohne Marken und reale Personen.

## Sources

- Lernlandkarte Mathematik (geöffnet), eigene Herleitungen und eigene Aufgaben. Keine Schulbuchtexte, keine
  Dritt-Inhalte (`thirdParty: none`), keine Videos. Nachgeschlagenes wird selbst nachgerechnet und nicht übernommen.
- Fachlicher Prüfer rechnet alle Aufgaben nach (Plan, „Review“).

## Adding a chapter or round

1. Ids der Karte prüfen (`mathematik.json`), Kompetenz und Voraussetzungen (`requires`) lesen.
2. Ordner `src/<kapitel>/`, `chapter.yaml` mit `title`, `summary`, `pages`; Kapitel in `src/app.yaml` unter `chapters`.
3. Seite `recap` für Voraussetzungen von außen (Komponente `Kurztest`), dann je Kompetenz eine Seite mit den
   Abschnitten `einstieg`, `modell`, `beispiel`, `uebung`.
4. Regler: `FunktionsGraph` mit `family`, `regler`, `fenster`, `tabelleX`, `labels`, `nojs`; neue Familie in
   `src/components/FunktionsGraph.ts` (Funktion, Termtext, Beschreibung) samt Test ergänzen.
5. Aufgaben aus den Mustern oben; `generated` nur mit Rechenprobe; `npx vp check --fix`, `npx vp build`,
   `npx --no -- lernapps check`, Commit.

## Rules learned from mistakes

- Prop-Typen einer Komponente stehen inline in der `.vue` (kein importierter Alias, sonst scheitert `vue-component-props-valid`).
- `generated`: Fehlwert darf für keinen gezogenen Wert gleich der Antwort sein (Bereiche der Variablen trennen).
- `intro` und Texte mit Doppelpunkt in Anführungszeichen; Formelbefehl `\mid` ist nicht erlaubt: Koordinaten als Text `(2 | 0)`.
