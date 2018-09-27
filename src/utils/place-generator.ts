import * as _ from 'lodash';

import { IPlace } from '@app/places/place.model';
import DayOfWeek from '@data/DayOfWeek';

export function createPlaces(count: number): IPlace[] {
    return _.range(count).map(createPlace);
}

export function createPlace(seed: number): IPlace {
    return {
        name: 'auto' + seed,
        description: 'description 101',
        location: {
            lat: 1 + seed,
            lng: 1 + seed,
            address: 'test st ' + seed
        },
        priority: 50,
        workingHours: {
            [DayOfWeek.SUNDAY]: [
                {
                    from: 9,
                    to: 18
                }
            ],
            [DayOfWeek.MONDAY]: [
                {
                    from: 9,
                    to: 18
                }
            ],
            [DayOfWeek.TUESDAY]: [
                {
                    from: 9,
                    to: 18
                }
            ],
            [DayOfWeek.WEDNESDAY]: [
                {
                    from: 9,
                    to: 18
                }
            ],
            [DayOfWeek.THURSDAY]: [
                {
                    from: 9,
                    to: 13
                },
                {
                    from: 14,
                    to: 19
                }
            ],
            [DayOfWeek.FRIDAY]: []
        }
    };
}
