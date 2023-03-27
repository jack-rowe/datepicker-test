import { Time } from "./types";

function isEqualDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isGreaterThanDay(d1: Date, d2: Date) {
  return d1.getTime() > d2.getTime();
}

function generateTimeList(from: Date, to: Date): Time[] {
  let timeList: Time[] = [];
  while (from.getTime() < to.getTime()) {
    let val = from.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    timeList.push({
      hour: from.getHours(),
      minute: from.getMinutes(),
      timeString: val,
    });
    from.setMinutes(from.getMinutes() + 30);
  }
  return timeList;
}

function setTimeToNextHalfHour(date: Date) {
  date.setMinutes((Math.ceil(date.getMinutes() / 30) * 30) % 60);
  if (date.getMinutes() === 0 && new Date().getMinutes() !== 0) {
    date.setHours(date.getHours() + 1);
  }
}

function getTimes(selectedDate: Date | null, hideDates: boolean): Time[] {
  if (!selectedDate) return [];
  let times: Time[] = [];
  const now = new Date();
  const nowRounded = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  if (isEqualDay(selectedDate, now)) {
    setTimeToNextHalfHour(nowRounded);
    if (!hideDates) {
      times = generateTimeList(dayStart, midnight);
    } else {
      times = generateTimeList(nowRounded, midnight);
    }
  } else if (isGreaterThanDay(selectedDate, now)) {
    times = generateTimeList(dayStart, midnight);
  } else if (isGreaterThanDay(now, selectedDate)) {
    if (hideDates) {
      times = [];
      return times;
    }
    times = generateTimeList(dayStart, midnight);
  }
  return times;
}

function addOrdinal(n: number) {
  if (n > 3 && n < 21) return n.toString() + "th";
  switch (n % 10) {
    case 1:
      return n.toString() + "st";
    case 2:
      return n.toString() + "nd";
    case 3:
      return n.toString() + "rd";
    default:
      return n.toString() + "th";
  }
}
const formatDate = (date: Date) => {
  return `${
    date.toLocaleString("default", {
      month: "long",
    }) +
    " " +
    addOrdinal(date.getDate()) +
    ", " +
    date.getFullYear()
  }`;
};
export { getTimes, addOrdinal, formatDate, isEqualDay, isGreaterThanDay, setTimeToNextHalfHour, generateTimeList };
