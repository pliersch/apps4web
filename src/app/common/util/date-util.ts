import { format } from 'date-fns/format'
import { de, enUS } from "date-fns/locale";
import { parse } from "date-fns/parse";


/**
 * removes time
 * @param date
 */
export function getDateWithoutTime(date: Date): Date {
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @param date like 10. Juni 2022
 */
export function parseGerman(date: string): Date {
  return parse(date, "do MMM yyyy", new Date(), {locale: de});
}

/**
 * @param date like 04.14.2022
 */
export function parseEnglish(date: string): Date {
  return parse(date, "MM.dd.yyyy", new Date(), {locale: de});
}

/**
 * need for wrong exif date
 * @param date like 2022:01:31
 */
export function parseExif(date: string): Date {
  return parse(date, "yyyy:MM:dd", new Date(), {locale: de});
}

/**
 * @return string like 01.31.2000
 */
export function formatEnglish(date: Date): string {
  return format(date, 'MM.dd.yyyy', {locale: enUS});
}

/**
 * @return string like 31.12.2000
 */
export function formatGerman(date: Date): string {
  return format(date, 'dd.MM.yyyy', {locale: de});
}

/**
 * @return string like 13. November
 */
export function formatGermanDayAndMonth(date: Date): string {
  return format(date, 'do MMMM', {locale: de});
}
