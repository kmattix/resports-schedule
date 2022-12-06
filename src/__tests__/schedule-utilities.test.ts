/**
 * @jest-enviorment-node
 */

import { formatSchedule } from '../utils/schedule-utilities';
import { input, output } from './testData';

describe('formatSchedule', () => {
    test('formats a schedule', () => {
        expect(formatSchedule(input)).toStrictEqual(output);
    });
});

describe('formatMatchDate', () => {
    
});