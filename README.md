# To do
- Kode kommentar
- Rettelser
- Video
- Rapport

# Andelsblik

Andelsblik er en Expo-prototype til andelsboligforeninger. Appen samler beskeder fra administrationen og viceværten og gør det nemt at finde kontaktoplysninger på lokale håndværkere.

## Funktioner

- `Opslagstavle`: beboere kan læse opslag, og administrationen kan oprette nye opslag.
- `Håndværkere`: søg i fagpersoner og tilføj navn, fagområde, telefonnummer og e-mail.
- Data gemmes lokalt med AsyncStorage, så nye opslag og fagpersoner huskes efter genstart på den samme enhed.
- Appen bruger ikke en ekstern database, så prototypen kræver ingen Firebase-konto eller betalingsløsning.

## Opsætning

```bash
cd obliOpg2
npm install
npx expo start
```

## Lokale data

Appen gemmer data i AsyncStorage på den enhed, hvor den kører. Data deles derfor ikke automatisk med andre brugere eller enheder.

Collectionen `announcements` bruger disse felter:

```text
title       string
body        string
author      string
createdAt   string
```

Collectionen `providers` bruger disse felter:

```text
name        string
category    string
phone       string
email       string
```

Data oprettes og redigeres via knapperne `Opret opslag` og `Tilføj fagperson` i appen. Når appen genstartes, indlæses de lokalt gemte data igen.

## Demovideo

Demovideo tilføjes, når den endelige optagelse er lavet.