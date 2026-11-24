export const EVENT_TIME_ZONE = "Asia/Dhaka";
const BANGLADESH_OFFSET = "+06:00";

export function getTodayInBangladesh(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EVENT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function getTomorrowInBangladesh(now = new Date()) {
  const [year, month, day] = getTodayInBangladesh(now).split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10);
}

export function getEventStartsAt(eventDate: string, eventTime: string) {
  return new Date(`${eventDate}T${eventTime}:00${BANGLADESH_OFFSET}`);
}

export function formatEventTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${suffix}`;
}
