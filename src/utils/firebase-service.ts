import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, deleteDoc, doc, DocumentData, getFirestore, Query, setDoc }
    from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { collection, query } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { MatchProps } from '../components/Match';

import { matchTimes } from '../global/Settings';

import { firebaseConfig } from '../firebase.config';

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();

// The name for the collection to store matches into.
const SCHEDULE_COLLECTION = 'schedule';
const GAMES_COLLECTION = 'games'

// The storage bucket name for game icons.
const GAME_LOGO_STORAGE = 'game_logos';

/**
 * Queries the entire schedule collection.
 * @returns A firestore query.
 */
export const querySchedule = (): Query<DocumentData> => {
    return query(collection(db, SCHEDULE_COLLECTION));
}

/**
 * Queries the games collection.
 * @returns A firestore query.
 */
export const queryGames = (): Query<DocumentData> => {
    return query(collection(db, 'games'));
}

/**
 * Gets a reference to a specific game.
 * @returns A firestore document reference.
 */
export const getGameRef = (game: string) => {
    return doc(db, GAMES_COLLECTION, game);
}

export const getGameIconUrl = async (game: string): Promise<string> => {
    return getDownloadURL(ref(getStorage(), `${GAME_LOGO_STORAGE}/${game}.png`))
        .then((url) => {
            return url;
        })
        .catch((error) => {
            return 'other';
        });
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