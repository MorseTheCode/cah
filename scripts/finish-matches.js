/* eslint-disable */

const { initializeApp } = require('firebase/app');

const {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDBHN9vw2-fL0dO4D1A7afJORIEpptEc3U",
  authDomain: "morsecah.firebaseapp.com",
  projectId: "morsecah",
  storageBucket: "morsecah.appspot.com",
  messagingSenderId: "385232562142",
  appId: "1:385232562142:web:5bafe1d6324428363a1f4f",
  measurementId: "G-EQVRWNENFK"
};

const app = initializeApp(firebaseConfig);

const matchesCollection = collection(getFirestore(app), 'matches');

const q = query(matchesCollection, where('status', '!=', 'FINISHED'));

const finishMatches = async () => {
  try {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          status: 'FINISHED',
        });

        console.log(`Partida ${doc.id} finalizada com sucesso.`);
      } catch (error) {
        console.error(`Erro ao finalizar partida ${doc.id}:`, error);
      }
    });

    console.log(`${querySnapshot.size} Partida(s) finalizadas com sucesso.`);
  } catch (error) {
    console.error('Erro ao finalizar partidas:', error);
  }
};

finishMatches();
