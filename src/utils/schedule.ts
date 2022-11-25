import dayjs from "dayjs";
import { MatchProps } from "../components/Match";

export const formatSchedule = (schedule: Array<MatchProps>): Array<MatchProps> => {

    const formatted = schedule.filter((item) => {
        return item.matchTime > dayjs().subtract(1, 'day').unix();
    });

    return formatted.sort((a, b) => {
        return a.matchTime - b.matchTime;
    });
}