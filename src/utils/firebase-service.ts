import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, deleteDoc, doc, getFirestore, setDoc } 
    from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebase.config';
import { collection, query } from 'firebase/firestore';
import { MatchProps } from '../components/Match';
import { matchTimes } from '../components/global/Settings';

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

export const modifyMatch = async (id: string, match: MatchProps) => {
    await setDoc(doc(db, 'schedule', id), {
        title: match.title,
        home: match.home,
        away: match.away,
        twitch: match.twitch,
        matchTime: match.matchTime,
        game: match.game
    });
}

export const removeMatch = async (id: string) => {
    await deleteDoc(doc(db, 'schedule', id));
}

export const removeOldMatches = async (matches: MatchProps[]) => {
    matches.forEach((match) => {
        if (match.matchTime < matchTimes.minModifyPassed.unix() && match.id) 
            removeMatch(match.id);
    })
}