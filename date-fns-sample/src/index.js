console.log();
import { format, formatDistance, formatRelative, subDays } from "date-fns";

console.log(format(new Date(), "'Today is a' eeee"));

console.log(
  formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
);

console.log(formatRelative(subDays(new Date(), 3), new Date()));

console.log("hello");
