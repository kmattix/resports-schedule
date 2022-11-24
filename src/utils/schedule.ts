import { MatchProps } from "../components/Match";

export const formatSchedule = (schedule: Array<MatchProps>): Array<MatchProps> => {

    const formatted = schedule.filter((item) => {
        return item.matchTime > Date.now() - 24 * 60 * 60 * 1000;
    });

    return formatted.sort((a, b) => {
        return a.matchTime - b.matchTime;
    });
}