import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, deleteDoc, doc, DocumentData, getFirestore, Query, setDoc } 
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

const SCHEDULE_COLLECTION = 'schedule-dev';

/**
 * Queries the entire schedule collection.
 * @returns A firestore query.
 */
export const querySchedule = (): Query<DocumentData> => {
    return query(collection(db, SCHEDULE_COLLECTION));
}

/**
 * Adds a new match to the schedule collection.
 * @param match The match props to add.
 */
export const addMatch = async (match: MatchProps) => {
    await addDoc(collection(db, SCHEDULE_COLLECTION), match);
}

/**
 * Modifies an existing match on the schedule collection.
 * @param id The firestore doc id to modify.
 * @param match The data to modify on the doc.
 */
export const modifyMatch = async (id: string, match: MatchProps) => {
    await setDoc(doc(db, SCHEDULE_COLLECTION, id), {
        title: match.title,
        home: match.home,
        away: match.away,
        twitch: match.twitch,
        matchTime: match.matchTime,
        game: match.game
    });
}

/**
 * Removes an existing match on the schedule collection.
 * @param id The firestore doc id to remove.
 */
export const removeMatch = async (id: string) => {
    await deleteDoc(doc(db, SCHEDULE_COLLECTION, id));
}

/**
 * Loops through existing matches and checks to see if their match time is less than the
 * min modification time then deletes it from firestore.
 * @param matches An array of existing match props.
 */
export const removeOldMatches = async (matches: MatchProps[]) => {
    matches.forEach((match) => {
        if (match.matchTime < matchTimes.minModifyPassed.unix() && match.id) 
            removeMatch(match.id);
    })
}