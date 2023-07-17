import moment from "moment-timezone";

const ISTOffset = 5.5;

function calculateWeeksBetweenDate(startDate, endDate) {
  const start = moment(startDate).tz("Asia/Kolkata");
  const end = moment(endDate).tz("Asia/Kolkata");

  const oneWeek = moment.duration(1, "week").asMilliseconds();

  const timeDifference = Math.abs(end - start);
  const weeks = Math.floor(timeDifference / oneWeek);

  return weeks;
}

function addDayToDate(date, yearToAdd = 85) {
  const fromDate = moment(date).tz("Asia/Kolkata");

  const toDate = fromDate.clone().add(yearToAdd, "years");

  return toDate.toDate();
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
  const currentDate = moment();

  const currentYear = currentDate.year();

  const nextYearDate = moment.tz([currentYear + 1, 0, 1], "Asia/Kolkata");

  const timeDiff = nextYearDate.diff(currentDate, "hours");

  return timeDiff;
}

function hoursLeftToday() {
  // Get the current time in the Indian time zone
  const now = moment.tz(moment(), "Asia/Kolkata");

  // Get the start of the next day in the Indian time zone
  const tomorrow = moment.tz("Asia/Kolkata").add(1, "day").startOf("day");

  // Calculate the time difference in hours
  const hoursLeft = tomorrow.diff(now, "hours");

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
