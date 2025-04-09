import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAhZLE9L0v6mwKMBlBoDzjAchAiArSlUk",
    authDomain: "nextroom-frontend.firebaseapp.com",
    projectId: "nextroom-frontend",
    storageBucket: "nextroom-frontend.firebasestorage.app",
    messagingSenderId: "844523802250",
    appId: "1:844523802250:web:75b97a6770cee1ee546773",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, 'nextroom-frontend');

export {db};