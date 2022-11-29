import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';

import { MatchProps } from '../components/Match';

import { matchTimes } from '../components/global/Settings';

dayjs.extend(isYesterday);

// Removes matches that are yesterday or older, then sorts them newest first.
export const formatSchedule = (schedule: Array<MatchProps>): Array<MatchProps> => {

    const formatted = schedule.filter((item) => {
        return !dayjs.unix(item.matchTime).isYesterday() || 
            (item.matchTime < matchTimes.minModifyPassed.unix());
    });

    return formatted.sort((a, b) => {
        return a.matchTime - b.matchTime;
    });
}

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