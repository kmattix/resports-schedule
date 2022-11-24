import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebase.config';
import { collection, query } from 'firebase/firestore';

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();

export const querySchedule = () => {
    return query(collection(db, 'schedule'));
}