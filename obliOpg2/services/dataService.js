import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const announcementKey = '@andelsblik/announcements';
const providerKey = '@andelsblik/providers';
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
const db = firebaseReady ? getFirestore(initializeApp(firebaseConfig)) : null;

const starterAnnouncements = [
  { id: 'welcome', title: 'Velkommen til Andelsblik', body: 'Her kan administrationen dele vigtigt nyt med alle beboere.', author: 'Administration', createdAt: 'I dag' },
  { id: 'water', title: 'Vand lukket tirsdag', body: 'Der lukkes for vandet i opgangen tirsdag kl. 10-12 på grund af service.', author: 'Vicevært', createdAt: 'I går' },
];

const starterProviders = [
  { id: 'p1', name: 'Hansen & Søn', category: 'Tømrer', phone: '+45 22 41 18 70', email: 'kontakt@hansen-son.dk' },
  { id: 'p2', name: 'Aqua VVS', category: 'VVS', phone: '+45 31 80 44 12', email: 'hej@aquavvs.dk' },
  { id: 'p3', name: 'Elpunkt ApS', category: 'Elektriker', phone: '+45 70 20 18 88', email: 'vagt@elpunkt.dk' },
];

async function readLocal(key, fallback) {
  try {
    const saved = await AsyncStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

async function writeLocal(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return value;
  }
  return value;
}

async function loadCollection(collectionName, key, fallback) {
  if (db) {
    const snapshot = await getDocs(collection(db, collectionName));
    if (!snapshot.empty) return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
  }
  return readLocal(key, fallback);
}

export async function getAnnouncements() {
  return loadCollection('announcements', announcementKey, starterAnnouncements);
}

export async function getProviders() {
  return loadCollection('providers', providerKey, starterProviders);
}

export async function saveItem(collectionName, key, item) {
  if (db) {
    const document = await addDoc(collection(db, collectionName), item);
    return { id: document.id, ...item };
  }
  const current = await readLocal(key, []);
  const next = [{ ...item, id: `${collectionName}-${Date.now()}` }, ...current];
  await writeLocal(key, next);
  return next[0];
}

export const storageKeys = { announcementKey, providerKey };
export const usesFirebase = firebaseReady;