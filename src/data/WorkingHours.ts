import ITimeRange from '@data/TimeRange';

export default interface IWorkingHours {
    [dayOfWeek: number]: ITimeRange[];
}
