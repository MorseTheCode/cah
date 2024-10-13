import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';

import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBHN9vw2-fL0dO4D1A7afJORIEpptEc3U",
  authDomain: "morsecah.firebaseapp.com",
  projectId: "morsecah",
  storageBucket: "morsecah.appspot.com",
  messagingSenderId: "385232562142",
  appId: "1:385232562142:web:5bafe1d6324428363a1f4f",
  measurementId: "G-EQVRWNENFK"
};
export const app = initializeApp(firebaseConfig);

export const authProvider = new GoogleAuthProvider();
export const auth = getAuth();

export const analytics = getAnalytics(app);

export const db = getFirestore(app);

export function createCollection<T = DocumentData>(
  collectionName: string
): CollectionReference<T> {
  return collection(db, collectionName) as CollectionReference<T>;
}
export const matchesCollection = createCollection<MatchType>('matches');
export const generalCollection = createCollection<GeneralType>('general');
export const cardsCollection = createCollection<CardType>('cards');
export const usersCollection = createCollection<UserType>('users');
export const adminsCollection = createCollection('admins');

export async function login(): Promise<UserCredential> {
  signInWithPopup(auth, authProvider)
  .then((result) => {
    // O usuário foi autenticado com sucesso
    const user = result.user;
    console.log(user);
    return result;
  })
}
