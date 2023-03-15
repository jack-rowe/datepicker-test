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

function generateTimeList(from: Date, to: Date) {
  let timeList: string[] = [];
  while (from.getTime() < to.getTime()) {
    let val = from.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    timeList.push(val);
    from.setMinutes(from.getMinutes() + 15);
  }
  return timeList;
}

function setTimeToNextQuarterHour(date: Date) {
  date.setMinutes((Math.ceil(date.getMinutes() / 15) * 15) % 60);
}

function getTimes(selectedDate: Date | null, hideDates: boolean): string[] {
  if (!selectedDate) return [];
  let times: string[] = [];
  const now = new Date();
  const nowRounded = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  if (isEqualDay(selectedDate, now)) {
    setTimeToNextQuarterHour(nowRounded);
    if (!hideDates) {
      times = generateTimeList(dayStart, midnight);
    } else {
      times = generateTimeList(nowRounded, midnight);
    }
  } else if (isGreaterThanDay(selectedDate, now)) {
    times = generateTimeList(dayStart, midnight);
  } else if (isGreaterThanDay(now, selectedDate)) {
    if (hideDates) {
      times = [""];
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
export { getTimes, addOrdinal, formatDate };