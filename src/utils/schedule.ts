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