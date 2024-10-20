// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: 'AIzaSyA6ArYARJJllATPbNuaVEnIPIgU9y32UDw',
   authDomain: 'project-manager-14d00.firebaseapp.com',
   projectId: 'project-manager-14d00',
   storageBucket: 'project-manager-14d00.appspot.com',
   messagingSenderId: '276150451641',
   appId: '1:276150451641:web:798bc7eeb01895da934a68',
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
