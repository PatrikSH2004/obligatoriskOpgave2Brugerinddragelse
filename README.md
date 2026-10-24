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
- Data gemmes med AsyncStorage, så nye opslag og fagpersoner huskes efter genstart.
- `services/dataService.js` er klar til Firebase Firestore. Når Firebase-miljøvariabler er sat, bruges Firestore automatisk.

## Opsætning

```bash
cd obliOpg2
npm install
npx expo start
```

For Firebase tilføjes disse Expo environment variables før start: `EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`, `EXPO_PUBLIC_FIREBASE_PROJECT_ID`, `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`, `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` og `EXPO_PUBLIC_FIREBASE_APP_ID`.

Firestore skal have collections med navnene `announcements` og `providers`. Collections bliver oprettet automatisk af Firestore, når det første opslag eller den første fagperson gemmes.

## Firestore-data

Appen lytter til ændringer i Firestore, så data på skærmen opdateres automatisk, når et dokument bliver tilføjet eller ændret.

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

Du kan derfor enten oprette dokumenterne manuelt i Firebase Console eller bruge knapperne `Opret opslag` og `Tilføj fagperson` i appen. Når Firebase er sat op, bliver nye data gemt i Firestore og vist for alle brugere, der har adgang til databasen.

Til lokal udvikling kan Firestore midlertidigt stå i test mode. Før appen deles, skal Firestore Rules ændres, så databasen ikke har åben læse-/skriveadgang.

## Demovideo

Demovideo tilføjes, når den endelige optagelse er lavet.