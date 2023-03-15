console.log();
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  parseISO,
} from "date-fns";

//console.log(format(new Date(), "'Today is a' eeee"));
// console.log(
//   formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
// );
//console.log(formatRelative(subDays(new Date(), 3), new Date()));

const foo = parseISO("2023-01-10T00:00+09:00", "yyyy-MM-dd");
//console.log(foo);
//console.log(format(foo, "yyyy-MM-dd"));

const bar = format(
  parseISO("2023-01-10T00:00+09:00", "yyyy-MM-ddTHH:mm:ss", new Date()),
  "yyyy-MM-dd"
);
console.log(bar);
