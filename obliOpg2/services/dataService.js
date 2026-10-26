import AsyncStorage from '@react-native-async-storage/async-storage';

const announcementKey = '@andelsblik/announcements';
const providerKey = '@andelsblik/providers';

// Nøglerne bruges til at finde de to datasæt i AsyncStorage.

// Eksempeldata gør appen brugbar første gang, før brugeren selv har gemt data.
const starterAnnouncements = [
  { id: 'welcome', title: 'Velkommen til Andelsblik', body: 'Her kan administrationen dele vigtigt nyt med alle beboere.', author: 'Administration', createdAt: 'I dag' },
  { id: 'water', title: 'Vand lukket tirsdag', body: 'Der lukkes for vandet i opgangen tirsdag kl. 10-12 på grund af service.', author: 'Vicevært', createdAt: 'I går' },
];

const starterProviders = [
  { id: 'p1', name: 'Hansen & Søn', category: 'Tømrer', phone: '+45 22 41 18 70', email: 'kontakt@hansen-son.dk' },
  { id: 'p2', name: 'Aqua VVS', category: 'VVS', phone: '+45 31 80 44 12', email: 'hej@aquavvs.dk' },
  { id: 'p3', name: 'Elpunkt ApS', category: 'Elektriker', phone: '+45 70 20 18 88', email: 'vagt@elpunkt.dk' },
];

// Henter et JSON-datasæt fra enhedens lokale lager.
async function readLocal(key, fallback) {
  try {
    const saved = await AsyncStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    // Ved lokal læsefejl bruges eksempeldataene, så appen stadig kan åbne.
    return fallback;
  }
}

// Gemmer et datasæt som JSON i enhedens lokale lager.
async function writeLocal(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Returnerer værdien, selv om den lokale lagring ikke lykkes.
    return value;
  }
  return value;
}

// Bevarer eksempeldata, som endnu ikke er blevet erstattet af brugerens egne data.
async function readCollection(key, fallback) {
  const saved = await readLocal(key, null);
  if (!saved) return fallback;

  const savedIds = new Set(saved.map((item) => item.id));
  const missingStarterItems = fallback.filter((item) => !savedIds.has(item.id));
  return [...saved, ...missingStarterItems];
}

// Henter et datasæt lokalt fra enheden.
async function loadCollection(collectionName, key, fallback) {
  return readCollection(key, fallback);
}

// Læser data lokalt og giver skærmen en ensartet callback-API.
function subscribeToCollection(collectionName, key, fallback, onData, onError) {
  readCollection(key, fallback).then(onData).catch(onError);
  return () => {};
}

export async function getAnnouncements() {
  // Henter opslag fra enhedens lokale lager.
  return loadCollection('announcements', announcementKey, starterAnnouncements);
}

export async function getProviders() {
  // Henter fagpersoner fra enhedens lokale lager.
  return loadCollection('providers', providerKey, starterProviders);
}

export function subscribeToAnnouncements(onData, onError) {
  // Skærmen bruger denne funktion til at hente opslag ved opstart.
  return subscribeToCollection('announcements', announcementKey, starterAnnouncements, onData, onError);
}

export function subscribeToProviders(onData, onError) {
  // Skærmen bruger denne funktion til at hente håndværkerlisten ved opstart.
  return subscribeToCollection('providers', providerKey, starterProviders, onData, onError);
}

export async function saveItem(collectionName, key, item) {
  // Tilføjer et lokalt id, så elementet kan bruges som React-nøgle.
  const fallback = key === announcementKey ? starterAnnouncements : starterProviders;
  const current = await readCollection(key, fallback);
  // Lokale elementer lægges forrest, så det nyeste vises først.
  const next = [{ ...item, id: `${collectionName}-${Date.now()}` }, ...current];
  await writeLocal(key, next);
  return next[0];
}

// Eksporterer lager-nøglerne, så skærmene ikke behøver kende deres tekstværdier.
export const storageKeys = { announcementKey, providerKey };