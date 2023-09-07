/**
 * @jest-enviorment-node
 */

import dayjs from 'dayjs';
import { formatMatchDate, formatSchedule } from '../utils/schedule-utilities';
import { case_1, case_2 } from '../data/schedules-tests';

describe('formatSchedule', () => {
    test('reorganizing a schedule', () => {
        expect(formatSchedule(case_1.input)).toStrictEqual(case_1.output);
    });

    test('removing old matches', () => {
        expect(formatSchedule(case_2.input)).toStrictEqual(case_2.output);
    });
});

describe('formatMatchDate', () => {
    test('completed', () => {
        expect(formatMatchDate(dayjs().subtract(1, 'hour').subtract(1, 'second').unix())).toBe('Completed');
    });

    test('live', () => {
        expect(formatMatchDate(dayjs().subtract(1, 'second').unix())).toBe('Live Now');
        expect(formatMatchDate(dayjs().subtract(1, 'hour').unix())).toBe('Live Now');
    });

    test('today', () => {
        expect(formatMatchDate(dayjs().unix()).split(' ')[0]).toBe('Today');
        expect(formatMatchDate(dayjs().hour(23).unix()).split(' ')[0]).toBe('Today');
    });

    test('tomorrow', () => {
        expect(formatMatchDate(dayjs().add(1, 'day').unix()).split(' ')[0]).toBe('Tomorrow');
    });

    test('this week', () => {
        const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        expect(formatMatchDate(dayjs().unix()).split(' ')[0]).toBe('Today');
        expect(formatMatchDate(dayjs().hour(23).unix()).split(' ')[0]).toBe('Today');
        expect(daysInWeek)
            .toContain(formatMatchDate(dayjs().add(2, 'day').unix()).split(' ')[0]);
        expect(daysInWeek)
            .toContain(formatMatchDate(dayjs().add(6, 'day').unix()).split(' ')[0]);
        expect(formatMatchDate(dayjs().add(7, 'day').unix()).split(' ')[0])
            .toMatch(/^(0?[1-9]|1[0-2]){1}\/(0?[1-9]|1[0-9]|2[0-9]|3[0-1]){1}$/gm);
    });
});