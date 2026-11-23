---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: code
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 1
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { accessible: 4, app-content-guide: 1, checks-pass: 7 }
---

# Plan: mathe-funktionsfamilien, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-23. Explore, Plan, Code, Commit.*

## Goal

Lernende der Klassen 9-10 erkunden Funktionsfamilien mit Schiebereglern (Parabeln, Potenz-, Wurzel-, Exponential- und Sinusfunktionen), lösen quadratische Gleichungen grafisch, numerisch und algebraisch und beschreiben Wachstum, Zerfall und periodische Vorgänge. Dazu Auftrag lernapps/apps#396; Abhängigkeiten #391, #392, #393, #395, #429 (nur über Sammel-Wiederholungen).

## Key decisions

- Archetyp `explainer`: Seiten erklären, dazu Übungen; die Regler sind eine Komponente (Vue) mit statischer Form (SVG und `nojs`-Text). `interactive` passt nicht: kein eigenes Modell/Spiel, sondern Erklärseiten.
- Sprache nur Deutsch.
- Regler-Komponente `FunktionsGraph` (Term – Tabelle – Graph, Regler, Pfeiltasten, Textalternative); eine Komponente, die Familie über Props (guess).
- Selbsttest in Recaps: Komponente `Kurztest` aus dem Epic (regeln.md 7.6).
- Kein `scope` (kein `open-task`, kein Material des Auftraggebers): Seiten haben keinen `scope`.
- Kapitelschnitt wie im Auftrag; zwei bis vier Seiten je Kapitel plus ein Recap am Kapitelanfang (guess).

## Notes

**Strang:** `mathematik/algebra`. Alle zehn Bausteine liegen in diesem Strang (Karte `mathematik.json` geöffnet).

**Bausteine (ids und „Ich kann …“ der Karte):**
- Kapitel 1: `quadratische-funktionen` (9-10, Schritt 1, requires lineare-funktionen, klammern-binome); `potenzfunktionen` (Schritt 2, requires potenzgesetze, funktionen-darstellung).
- Kapitel 2: `quadratische-gleichungen-einfach` (S2, requires klammern-binome, quadratwurzeln); `quadratische-gleichungen` (S3, requires quadratische-gleichungen-einfach, lineare-gleichungen); `quadratische-funktionen-anwenden` (S4, requires quadratische-funktionen, quadratische-gleichungen).
- Kapitel 3: `zinseszins` (7-8, S3, requires zinsrechnung, prozent-veraenderung); `exponentialfunktionen` (S2, requires prozent-veraenderung, potenzgesetze, funktionen-darstellung); `logarithmen` (S3, requires exponentialfunktionen).
- Kapitel 4: `sinusfunktion` (S5, requires bogenmass, funktionen-darstellung); `periodische-vorgaenge` (S6, requires sinusfunktion).

**Voraussetzungen von außen (Recap, je Baustein ein Abschnitt, Namen der Karte):**
- K1: Lineare Funktionen (`lineare-funktionen`), Klammern und binomische Formeln (`klammern-binome`), Potenzgesetze (`potenzgesetze`), Darstellungen von Funktionen (`funktionen-darstellung`).
- K2: Klammern und binomische Formeln, Quadratwurzeln (`quadratwurzeln`), Lineare Gleichungen (`lineare-gleichungen`).
- K3: Zinsrechnung (`zinsrechnung`), Prozentuale Zu- und Abnahme (`prozent-veraenderung`), Potenzgesetze, Darstellungen von Funktionen.
- K4: Bogenmaß (`bogenmass`), Darstellungen von Funktionen.
Die Apps der Vorgänger wurden nicht gelesen. Karte-Fund (nicht behoben): `quadratische-gleichungen-einfach` setzt `quadratwurzeln` voraus, das im Auftrag/Abgrenzung (#392 Potenz- und Wurzelrechnung) liegt; `quadratische-funktionen-anwenden` braucht `quadratische-funktionen`+`quadratische-gleichungen`, beides in dieser App.

**Seitenplan (Vorschlag):**
- K1: Recap · Normalparabel und Regler (Verschieben, Strecken, Spiegeln) · Scheitelform und allgemeine Form · Potenz- und Wurzelfunktionen (x³, 1/x, √x).
- K2: Recap · Einfache quadratische Gleichungen (Nullstellen, Wurzelziehen, Ausklammern, Produkt gleich null) · Quadratische Gleichungen (quadratische Ergänzung mit Rechteckmodell, Lösungsformel, Anzahl der Lösungen, drei Wege) · Quadratische Funktionen anwenden (Wurfbahn, Brückenbogen, Zaun).
- K3: Recap · Zinseszins (Faktor statt Betrag) · Exponentialfunktionen (linear gegen exponentiell, Zerfall Medikament) · Logarithmen (Verdopplungszeit).
- K4: Recap · Sinus und Kosinus (Riesenrad, Einheitskreis) · Periodische Vorgänge (Amplitude, Periode, Gezeiten/Tageslänge).
Jeder Baustein mindestens drei Aufgaben.

**Wie geübt wird:** Regler verändern, Werte ablesen, Funktionsterm und Graph zuordnen (Komponente mit Aufgaben), `generated` für Rechnungen (Scheitelpunkt, Nullstellen, Zinsfaktor, Logarithmus) mit typischen Fehlern (Vorzeichen der Verschiebung, Zinssatz statt Faktor, linear statt exponentiell), Einfach-/Mehrfachauswahl für Begriffe.

**Misskonzepte, die die Rückmeldung fängt:** f(x) = (x − 2)² verschiebt nach rechts; a < 0 spiegelt, |a| > 1 streckt; Lösungen sind Nullstellen, kein Schnitt mit der y-Achse; p-q-Formel mit falschem Vorzeichen; 5 % Zinsen bedeuten Faktor 1,05; exponentiell ist nicht „immer um gleich viel mehr“; Rechner im Gradmodus bei Bogenmaß.

**Umfang:** drin: vier Kapitel, zehn Bausteine, Abgrenzung nach Auftrag (lineare Funktionen #395, Potenz- und Wurzelrechnung als Zahlen #392, Bogenmaß #429 nur im Recap). Nicht drin: Ableitungen, Polynomdivision, Winkelverschiebung c in a·sin(b·(x−c)) nur am Rand (Karte: f(x) = a·sin(b·x)).

**Quellen:** Karte (`mathematik.json`), KMK-Bildungsstandards 2022 und Hessischer Lehrplan nicht geöffnet (nicht geprüft); eigene Herleitungen und Aufgaben. Fachbegriffe werden vom fachlichen Prüfer nachgerechnet. Nachschlagen nur ohne Übernahme.

**Laufzeitgrenzen (aus funde.md):** W28 Brüche in Rückmeldungen als `a/b`; W31 Recap ohne Aufgaben → `Kurztest`; W34 `term` nur einmal als `definition`; W40/W41/W42 Kurztest-Kopie mit behobenem `min-width`; W43 `\ldots` nicht erlaubt, Zahlfelder lehnen `1/2` ab, `^` in `generated`-Text; W16 keine geschützten Leerzeichen in Titeln.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Recherche freigegeben (Orchestrator in Vertretung): Zuschnitt, FunktionsGraph, nur Deutsch, Musterseite Normalparabel in K1

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

- Goal: Lernende verstehen, dass Funktionen Familien bilden, deren Graphen sich durch Parameter verschieben, strecken und spiegeln lassen; sie lösen quadratische Gleichungen grafisch, numerisch und algebraisch und beschreiben Wachstum, Zerfall und periodische Vorgänge. (Quelle: Auftrag lernapps/apps#396, vom Orchestrator in Vertretung des Menschen.)
- Learners: Mathematik, Klasse 9-10, Strang algebra. Vorwissen: lineare Funktionen und Dreifachansicht Term–Tabelle–Graph, Klammern und Binome, Potenzgesetze, Prozentrechnung, Bogenmaß (je als Sammel-Wiederholung).
- Model and focus: Graph mit Schiebereglern trägt das Explainer; Tabelle und Term daneben. Schwerpunkt Visualisierung plus Übungen.
- Hurdles: Auftrag nennt keine; fachlich typisch: Vorzeichen der Verschiebung (x − d), Wachstumsfaktor mit Prozentsatz verwechselt, exponentiell mit linear verwechselt, Sinus im Gradmodus. (guess)
- Content: Agent aus eigenen Herleitungen, Karte, KMK-Standards, Hessen-Kerncurriculum (regeln.md Abschnitt 4).
- Amount: vier Kapitel, zehn Bausteine, je mindestens drei Aufgaben; Kapitelaufbau nach Auftrag.
- Languages: Deutsch.
- Look and feel: fixed by the archetype (ruhig wie ein Arbeitsblatt, Dunkelmodus folgt dem Gerät).
- Terms: Wörter der Karte (Namen der Bausteine); Regeln regeln.md Abschnitt 2 (Komma, −, ·, :).
- Finding the app: Funktionsfamilien, Parabel, quadratische Gleichungen, Zinseszins, Exponentialfunktion, Sinusfunktion, Klasse 9 10.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Plan bestätigt (Orchestrator in Vertretung): selbstständig bis Musterseite normalparabel

### Content method

**Seiten (Baustein → Seite):**

| Kapitel | Seite (Datei) | Baustein-Ids | Neuer Schritt | Kernkomponente |
|---|---|---|---|---|
| 1 `parabeln` | `recap` | recap: lineare-funktionen, klammern-binome, potenzgesetze, funktionen-darstellung | Selbsttest je Baustein | `Kurztest` |
| 1 | `normalparabel` (Muster) | quadratische-funktionen | a, d, e verschieben/strecken/spiegeln: f(x) = a(x − d)² + e | `FunktionsGraph` |
| 1 | `scheitelform-allgemein` | quadratische-funktionen | Scheitelform und f(x) = ax² + bx + c als derselbe Graph, Umrechnen | `FunktionsGraph` |
| 1 | `potenzfunktionen` | potenzfunktionen | x³, 1/x, √x als weitere Mitglieder, Definitionsbereich | `FunktionsGraph` |
| 2 `gleichungen` | `recap` | recap: klammern-binome, quadratwurzeln, lineare-gleichungen | | `Kurztest` |
| 2 | `einfache-gleichungen` | quadratische-gleichungen-einfach | Nullstellen, Wurzelziehen, Ausklammern, Produkt gleich null | `FunktionsGraph` |
| 2 | `drei-wege` | quadratische-gleichungen | zwei/eine/keine Lösung; quadratische Ergänzung (Rechteckmodell), Lösungsformel | `FunktionsGraph`, SVG |
| 2 | `anwendungen` | quadratische-funktionen-anwenden | Wurfbahn, Brückenbogen, größte Fläche | `FunktionsGraph` |
| 3 `wachstum` | `recap` | recap: zinsrechnung, prozent-veraenderung, potenzgesetze, funktionen-darstellung | | `Kurztest` |
| 3 | `zinseszins` | zinseszins | Faktor statt Betrag je Jahr | Tabelle, `FunktionsGraph` |
| 3 | `exponentialfunktionen` | exponentialfunktionen | linear gegen exponentiell, Zerfall (Medikament) | `FunktionsGraph` |
| 3 | `logarithmen` | logarithmen | „Wann doppelt so viel?“, Logarithmus als Umkehrung | `FunktionsGraph` |
| 4 `sinus` | `recap` | recap: bogenmass, funktionen-darstellung | | `Kurztest` |
| 4 | `sinus-kosinus` | sinusfunktion | Riesenrad, Einheitskreis, Höhe wird zum Graphen | `FunktionsGraph` |
| 4 | `periodische-vorgaenge` | periodische-vorgaenge | a·sin(b·x), Amplitude und Periode an Messreihe anpassen | `FunktionsGraph` |

Alle zehn Bausteine werden auf mindestens einer Seite geübt; mindestens drei Aufgaben je Baustein, steigend.

**Komponente `FunktionsGraph` (einzige Reglerkomponente, Warum Komponente: kein Block zeichnet Graphen mit Reglern):** Props `family` (quadratic | cubic | reciprocal | sqrt | exp | sin), Reglerliste (Name, Min, Max, Schritt, Start), Fenster, Achsenbeschriftung, optional Zielkurve/Messpunkte. Sichtbar: Term (mit aktuellen Parameterwerten), Wertetabelle (7 Zeilen), Graph (SVG). Regler = `<input type="range">` mit Beschriftung, Pfeiltasten, Wert angezeigt; Reset-Knopf. Startzustand zeigt die Grundform, der erste Regler ändert genau eine Eigenschaft (`explainer-control-purpose`). Statische Form: `nojs`-Text (Term, Tabelle, Beschreibung des Graphen mit je drei Beispielwerten der Regler) plus ein SVG-Bild je Grundform. Eine zweite Komponente `FunktionsGraphAufgabe` (Exercise-Komponente): „Stelle die Regler so ein, dass der Graph durch die Punkte geht“ mit `check` über Toleranz, `reason` je typischem Fehler (Vorzeichen, Streckung). Sie zählt nicht als Pflichtübung; jede Seite hat zusätzlich Fragen/`generated`.

**Muster (Exercises, Rückmeldung):**
- *Ablesen/Deuten*: Graph und Regler gegeben, Wert oder Aussage gefragt (single-choice, number).
- *Passend einstellen*: Exercise-Komponente, Zielwerte aus Seed.
- *Rechnen*: `generated` mit `mistakes` (Vorzeichen bei Verschiebung, Zinssatz statt Faktor, + statt ·, falsche Quadratwurzel, −b statt b in der Formel).
- *Begründen*: true-false/multiple-choice mit Grund in `info`.
Zahlen: Komma, `−`, `·`, `:`; Brüche in Rückmeldungen `a/b` (W28), im Text gesetzt (`\frac`).

**Aufbau jeder Seite (Abschnitte mit gleichen Ids):** `einstieg` (Ziel in Lernerwort + erste leichte Aufgabe/Regler), `modell` (Darstellung in Worten, vor der ersten Aufgabe), `beispiel`, `uebung`. Höchstens 350 Wörter, höchstens 4 Textblöcke in Folge.

**Recap-Seiten:** je Baustein ein Abschnitt (Überschrift = Kartenname), Begriffe fett, Beispielkasten, `Kurztest` (nicht zu leicht: erste Frage nicht im Kopf lösbar, Hinweis zeigt den Weg), Satz mit Kartenseite `https://lernapps.net/apps/map/mathematik/c/<id>/`; Kopf „Das brauchst du für dieses Kapitel“, Schluss Checkliste „Du bist bereit, wenn du …“. Begriffe ins Glossar (`definition`; Wiederholung nur fett, W34). `Kurztest` kopiert aus `/tmp/epic/docs/mathe-epic/components/`, mit W42-Korrektur.

**Engagement je Kapitel:** Wurfbahn eines Balls (K2), Brückenbogen, Sparkonto (K3), Medikament, Riesenrad (K4). Keine Personen mit Namen außer erfundenen; keine Marken.

**Daten:** `src/data/wachstum.yaml` (Szenarien Sparkonto/Medikament mit Anfangswert, Faktor) für `generated` mit Schritten; `src/data/messreihen.yaml` (Gezeiten, Tageslänge) für Periodenseite.

**Tutor:** keine Sonderregeln. Selbsteinschätzung (`selfAssessment`) in Commit wie im Skill.

**Engagement je Seite (Öffnung · Wechsel · Belohnung · Geschichte):**
- `normalparabel`: Regler a, d, e; Öffnung: „Ziehe a auf −1: was passiert?“ (Regler, Begründung in der Antwort) · Wechsel Regler → Tabelle → Lesen → Einstellen-Aufgabe · Belohnung: du liest d, e am Scheitel ab · Geschichte: Wurfbahn eines Balls (Vorgriff, K2 nimmt sie auf).
- `scheitelform-allgemein`: zwei Terme, ein Graph; Öffnung: „Welcher Term gehört zum Graphen?“ · Rechnen mit `generated` (binomische Formel rückwärts) · Belohnung: du wandelst beide Formen ineinander · Brückenbogen.
- `potenzfunktionen`: Regler Exponent n und Faktor a; Öffnung: Welche Familie hat keine negativen Werte? · Zuordnung Term–Graph · Wertebereiche.
- `einfache-gleichungen`: Öffnung: Graph schneidet die x-Achse: wo? · drei Typen (Wurzelziehen, Ausklammern, Produkt null) mit `generated`.
- `drei-wege`: Öffnung: zwei, eine, keine Lösung am Regler e · Rechteckmodell der quadratischen Ergänzung als SVG · Formel · Belohnung: Vergleich der drei Wege an einer Aufgabe.
- `anwendungen`: Wurfbahn, Brückenbogen, Zaun (größte Fläche); Öffnung: Wie weit fliegt der Ball? (Regler) · Rechnen mit Rückfragen zum Sachbezug.
- `zinseszins`: Öffnung: 1 000 € bei 3 %: Jahr 1 bis 3 von Hand · Tabelle zeigt Faktor 1,03 · Belohnung: du berechnest K·qⁿ.
- `exponentialfunktionen`: lineares und exponentielles Konto laufen um die Wette (zwei Graphen, ein Regler) · Zerfall eines Medikaments.
- `logarithmen`: Öffnung: Wann ist das Konto doppelt so hoch? Probieren in der Tabelle · dann log als Umkehrung.
- `sinus-kosinus`: Öffnung: Riesenrad, Punkt läuft, Höhe wird zum Graphen (Regler Winkel) · Bogenmaß-Werte ablesen.
- `periodische-vorgaenge`: Regler a, b gegen Messpunkte (Gezeiten, Tageslänge) · Belohnung: Modell passt zur Messreihe; Kapitel schließt mit Rückblick.

**Prüfer:** vor „Veröffentlichen“ fachlicher Prüfer und Lernenden-Prüfer; Musterseite vorher vom Lernenden-Prüfer (Klasse 9-10).

## Review

### Lernenden-Prüfer, Musterseite `normalparabel` (Klasse 9-10, unabhängiger Unteragent)
Umgesetzt: rohes LaTeX in `mistakes` entfernt (Klartext statt `$…$`); Regleraufgabe gibt jetzt je falschem Regler einen Hinweis (`hints`, ohne Lösung); Anleitung „a an der Kurve ablesen“; Gitterlinien im Graphen alle 1 bzw. 2 Einheiten; Tabelle der Aufgabe bis ±6; „Öffnung“ und „Familie“ erklärt; Staucht-Beispiel; Reihenfolge der Regler im Text wie auf der Seite; Hinweis „dafür brauchst du JavaScript“; Tipp ohne Buchstaben a, d, e; Lösungsweg mit Zwischenergebnissen (Datenfile `parabelwerte`); zusätzliche Aufgabe `scheitel-plus` für (x + d)²; Reglertabelle ohne umbrechende Klammern.
Nicht umgesetzt / Laufzeit (Funde, nicht behoben): „Prüfen“ der Komponente erst nach Reglerbewegung aktiv und nach jeder Prüfung wieder gesperrt, ohne Hinweis; kein „Lösung“-Knopf bei Exercise-Komponenten, verdeckter Lösungstext bleibt bei „Neue Aufgabe“ veraltet; „x = 1“ im Zahlfeld → „Antworte zuerst …“ (W18/W6); Standardrückmeldung „Lies dazu noch einmal den Text“ bei true-false (W13); „Neue Aufgabe“ nur als Symbol (W5); Aufgabennummern springen (W12); Aufgaben 1 und true-false nicht wiederholbar nach „Lösung“.
Offen: Zielparabel hat keine Textalternative im Graph (Aufgabe ist sehbasiert; `describe` für den Tutor nennt die Werte); Seite bei 360 px lang (neun Bildschirme).
Noch nicht geprüft: Screenreader, Touch.
Nach dem Prüferlauf geändert (nicht erneut geprüft): Textalternative der Zielkurve im `aria-label` des Graphen (Scheitel, Öffnung, Faktor a, drei Werte; Wunsch des Orchestrators, regeln.md 3.7), gilt für alle Aufgaben mit Zielkurve.

### Fachlicher Prüfer, alle Seiten (Unteragent, unabhängig)
Befunde: 2 Fehler (Wertetabelle im nojs der Wurfbahn; falsche Begründung „Schwerkraft“), 16 Ungenauigkeiten, Schreibweisen (keine geschützten Leerzeichen, negative Platzhalter mit Bindestrich, `a/b` außerhalb der Ausnahme), 7 Websuchen auf wörtliche Übernahmen ohne Treffer, alle `generated`-Aufgaben mit allen Datensätzen nachgerechnet (227 Kombinationen), je Baustein mindestens 4 Aufgaben.
Umgesetzt: beide Fehler; Zwischenfaktoren im Zinseszins (nicht mehr gerundet gezeigt); Hinweis ohne Lösung (`kehrwert-rechnen`); „natürliche Zahl n“; x⁴ nicht „breite Parabel“; Quadrant; binomische Formeln (dritte genannt); Normalform; „reell“ gestrichen; Zaun-Scheitel und Wurzelziehen-Schritte begründet; lg erklärt; Frage zur Überholung; Quadrat-Beschreibung mit Vorzeichen; geschützte Leerzeichen (95 Stellen); negative Platzhalter in Formeln; Kurztest-Reihenfolge im Bauteil gemischt (fester Zufall je Frage); y-Ticks (7000-Fenster).
Nicht umgesetzt: Tageslänge nicht angepasst (nur Wasserstand); `a ≠ 1` und Herleitung der Lösungsformel nur genannt; Fehlerwerte mancher `generated` fallen bei einzelnen Datensätzen zusammen (`formel-anwenden`, `wert-berechnen`: erste Meldung gilt); Wasserrakete mit 25 m Höhe (a=1, s=5); achsenname y bleibt „f(x)“.

### Lernenden-Prüfer, ganze App (Unteragent, Klasse 9-10)
Befunde und Umsetzung: rohes LaTeX in `sinus-wert`/`kosinus-wert` (Bogenmaß wieder als `π/6` Text, zählt als `a/b` außerhalb der Ausnahme: 2 Aufgaben, Daten in `sinuswerte`, `kosinuswerte`); Sternchen in einer Tabellenüberschrift entfernt; „Grafisch“ verweist jetzt auf die Regler oben; Beispiel zur quadratischen Ergänzung vor der Ordnen-Aufgabe, Widerspruch „ziehst du wieder ab“ behoben; `a ≠ 1` vermerkt; „Exponent“ statt „Hochzahl“; b als Mittelterm erklärt; fehlende Glossarbegriffe (Parabel, Mittelterm, Quadratische Ergänzung, Einheitskreis, Amplitude, Periode, Zinseszins, Exponentialfunktion); Wahr/Falsch ausgewogen (fünf von elf jetzt „stimmt nicht“); Antwortoptionen der Übungen gemischt (Reihenfolge im YAML gedreht); Legende für beide Kurven; Tabelle der Verdopplung ab Jahr 6; Tabellenüberschrift der Messreihe („nicht die Messwerte“); Regler Amplitude nur positiv; Hinweise auf Zinssatz p, Mittelterm, „definiert“, negative Quadrate.
Nicht umgesetzt / Laufzeit (Funde): rohe Kennungen „mathematik/lineare-funktionen“ im Kopf der Recap-Seiten (W37); `Kurztest`-Legende quer über dem Rahmen (W41); Geldantwort „3.247,3 €“ statt Komma und zwei Stellen (W17); „x=3“ und „1/4“ im Zahlfeld → „Antworte zuerst“ (W6/W18); Standardrückmeldung bei „stimmt nicht“ (W13); „Prüfen“ der Komponente grau ohne Hinweis; Aufgabennummern springen (W12).
Offen: Start-Selbsteinschätzung (33 Aufgaben) nicht durchgespielt; Tutor-Knöpfe nicht bedient; Zielparabel-Aufgabe vom Prüfer nicht gelöst.

### Änderungen nach dem letzten Prüferlauf (nicht erneut geprüft, solange nicht unten vermerkt)
Zweiter gezielter Lauf (fachlich und Lernende) auf den Änderungen der ersten Runde: fachlich 3 Fehler (Grammatik nach „Exponent“, nojs-Bereich des Reglers, fehlende geschützte Leerzeichen), 5 Ungenauigkeiten (Mittelterm, b ≠ 1, Amplitude, „ganzer“ Exponent, Dezimalkomma in Formeln: Temml setzt `0,5` als eine Zahl, kein Befund); alle behoben. Lernende: roh sichtbare Formeln keine mehr in den Texten; offen aus dem Lauf: Rückmeldung der Zielparabel-Aufgabe nach „Prüfen“ (Prüfer sah keine Meldung, im ersten Lauf kam „Richtig!“; Laufzeit), Kurztest-Legende (W41), Kennungen im Recap-Kopf (W37).
Nach dem zweiten Lauf nochmals geändert (inhaltlich, nicht erneut geprüft): Beispielschritte der quadratischen Ergänzung benannt; Verweis „Stelle oben die Regler …“ begründet (Scheitelform, ausmultiplizierte Form), Regler d bis 4; Probe-Aufgabe der Scheitelform auf x² − 4x + 7; Periode vor der Tabelle auf der Sinus-Seite erklärt; Hinweis zu Winkeln über 90°; Frage „kleinster Faktor“ bei den Konten; Tabelle „Zwei Arten zu wachsen“ zweispaltig mit Formeln darunter; Glossar um Sinus, Kosinus, Lösungsformel, Exponentieller Zerfall erweitert; Tabellenwerte ab 100 mit zwei Dezimalstellen; Spaltenname „Wert der Funktion“; Beschriftung im Einheitskreis größer; Text im Ergänzungsbild nicht mehr abgeschnitten.

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Musterseite K1 'Normalparabel' mit Komponente FunktionsGraph (Term, Tabelle, Graph, Regler a, d, e, nojs und SVG-Form), Aufgaben (Ablesen, Einstellen, generated), plus Kapitel-Rahmen und app.yaml; Lernenden-Prüfer (Klasse 9-10) spielt durch; Befunde umsetzen
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: Musterseite angenommen (Orchestrator in Vertretung), Textalternative der Zielkurve nachgebessert
- [x] Kapitel 1: Recap (Kurztest-Kopie nach src/components, vier Bausteine, Glossar), Seiten scheitelform-allgemein und potenzfunktionen; Push
- [x] Kapitel 2: Recap, einfache-gleichungen, drei-wege (Rechteckmodell, Formel, FunktionsGraphAufgabe), anwendungen; Push
- [x] Kapitel 3: Recap, zinseszins, exponentialfunktionen, logarithmen mit Datenfile wachstum; Push
- [x] Kapitel 4: Recap, sinus-kosinus, periodische-vorgaenge mit Datenfile messreihen; Push
- [x] App-Ebene: Start-/Intro-Text, Glossar, Medienübersicht, Selbsteinschätzung (Skill lernapps-explainer-self-assessment), Inhaltsleitfaden app-content
- [x] Prüfer: fachlicher Prüfer und Lernenden-Prüfer über alle Seiten; Befunde im Plan unter Review, Änderungen danach erneut prüfen; lernapps check ohne Fehler
<!-- tasks: pages (6 added): the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->

