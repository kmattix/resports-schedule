import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebase.config';
import { collection, query } from 'firebase/firestore';
import { MatchProps } from '../components/Match';

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();


export const querySchedule = () => {
    return query(collection(db, 'schedule'));
}

export const addMatch = async (match: MatchProps) => {
    await addDoc(collection(db, 'schedule'), match);
}