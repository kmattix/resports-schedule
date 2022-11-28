import dayjs from "dayjs";

//seconds
export const refreshDelay = 10;

//ms
export const toolTipDelays = {
    enter: 500,
    enterNext: 2000
}

export const matchTimes = {
    min: dayjs().subtract(1, 'day'),
    minModifyPassed: dayjs().subtract(1, 'day'),
    max: dayjs().add(1, 'year')
}