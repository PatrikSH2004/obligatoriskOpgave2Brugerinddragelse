# To do
- Få forbundet en database.
- Tjek listen angående krav for produktet





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

Firestore skal have collections med navnene `announcements` og `providers`. Prototype-data vises lokalt, indtil collections findes.

## Demovideo

Demovideo tilføjes, når den endelige optagelse er lavet.