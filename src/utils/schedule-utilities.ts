import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';

import { MatchProps } from '../components/Match';

import { matchTimes } from '../components/global/Settings';

dayjs.extend(isYesterday);

/**
 * Removes matches if they are yesterday or older and sorts them based on which is coming
 * up next.
 * @param schedule The array of match props to format.
 * @returns A formatted array of match props.
 */
export const formatSchedule = (schedule: Array<MatchProps>): Array<MatchProps> => {

    const formatted = schedule.filter((item) => {
        return item.matchTime > matchTimes.minModifyPassed.unix() && 
            !dayjs.unix(item.matchTime).isYesterday();
    });

    return formatted.sort((a, b) => {
        return a.matchTime - b.matchTime;
    });
}

/**
 * Formats the match date for display:
 * 
 * - Match time was over an hour old? `Completed`
 * - Match time was within the hour? `Live`
 * - Match time is today and hasn't started yet? `Today @ hh:mm[A/P]M`
 * - Match time is not today and is within the week? `Weekday @ hh:mm[A/P]M`
 * - Match time is further away than this week? `MM/dd @ hh:mm[A/P]M`
 * 
 * @param n A unix timestamp.
 * @returns A formated string displaying when the match is.
 */
export const formatMatchDate = (n: number): string => {
    const d = dayjs.unix(n);
    let day = '';

    if (d.unix() < dayjs().subtract(1, 'hour').unix()) {
        return 'Completed';
    }
    
    if(d.unix() < dayjs().unix()) {
        return 'Live Now';
    }

    if(dayjs().add(7, 'day').unix() > d.unix()) {
        if(d.day() === dayjs().day()) {
            day = 'Today';
        } 
        else {
            switch(d.day()) {
                case 0:
                    day = 'Sunday';
                    break;
                case 1:
                    day = 'Monday';
                    break;
                case 2:
                    day = 'Tuesday';
                    break;
                case 3:
                    day = 'Wednesday';
                    break;
                case 4:
                    day = 'Thursday';
                    break;
                case 5:
                    day = 'Friday';
                    break;
                case 6:
                    day = 'Saturday';
                    break;
            }
        }  
    }
    else {
        day = `${d.month() + 1}/${d.date()}`;
    }

    let hours = d.hour();
    let minutes = d.minute();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return (
        `${day} @ ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
    );
}