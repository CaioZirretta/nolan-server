export function formatDateSecAndMilSecToZero(date: string): Date {
    const newDate: Date = new Date(date);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
}
