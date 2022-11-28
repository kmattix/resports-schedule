import { matchTimes } from '../components/global/Settings';
import { MatchProps } from '../components/Match';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
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