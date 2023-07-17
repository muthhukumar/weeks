const ISTOffset = 5.5;

function calculateWeeksBetweenDate(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const oneWeek = 7 * 24 * 60 * 60 * 1000 * ISTOffset;

  const timeDifference = Math.abs(end.getTime() - start.getTime());
  const weeks = Math.floor(timeDifference / oneWeek);

  return weeks;
}

function addDayToDate(date: string, yearToAdd: number = 85): Date {
  const fromDate = new Date(date);

  fromDate.setFullYear(fromDate.getFullYear() + yearToAdd);

  return fromDate;
}

function splitArrayIntoChunks<T>(
  data: Array<T>,
  chunksSize: number
): Array<Array<T>> {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < data.length; i += chunksSize) {
    let chunk = data.slice(i, i + chunksSize);
    result.push(chunk);
  }

  return result;
}

function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substring(2, 5);
  const uniqueId = timestamp + randomNum;

  return uniqueId;
}

function hoursLeftThisYear() {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  const nextYearDate = new Date(currentYear + 1, 0, 1);

  const timeDiff = nextYearDate.getTime() - currentDate.getTime();

  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60 * ISTOffset));

  return hoursLeft;
}

function hoursLeftToday() {
  const now = new Date();

  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const timeDiff = tomorrow.getTime() - now.getTime();

  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60 * ISTOffset));

  return hoursLeft;
}

export {
  generateUniqueId,
  calculateWeeksBetweenDate,
  addDayToDate,
  splitArrayIntoChunks,
  hoursLeftThisYear,
  hoursLeftToday,
};
