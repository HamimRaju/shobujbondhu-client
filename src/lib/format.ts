const TIME_ZONE = "Asia/Dhaka";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: TIME_ZONE,
});

export function formatEventDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatEventTimeRange(startIso: string, endIso: string): string {
  return `${timeFormatter.format(new Date(startIso))} – ${timeFormatter.format(new Date(endIso))}`;
}
