import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, deleteDoc, doc, getFirestore, setDoc } 
    from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { collection, query } from 'firebase/firestore';

import { MatchProps } from '../components/Match';

import { matchTimes } from '../components/global/Settings';

import { firebaseConfig } from '../firebase.config';

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();

export const querySchedule = () => {
    return query(collection(db, 'schedule'));
}

export const addMatch = async (match: MatchProps): Promise<void> => {
    await addDoc(collection(db, 'schedule'), match);
}

export const modifyMatch = async (id: string, match: MatchProps): Promise<void> => {
    await setDoc(doc(db, 'schedule', id), {
        title: match.title,
        home: match.home,
        away: match.away,
        twitch: match.twitch,
        matchTime: match.matchTime,
        game: match.game
    });
}

export const removeMatch = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'schedule', id));
}

export const removeOldMatches = async (matches: MatchProps[]): Promise<void> => {
    matches.forEach((match) => {
        if (match.matchTime < matchTimes.minModifyPassed.unix() && match.id) 
            removeMatch(match.id);
    })
}