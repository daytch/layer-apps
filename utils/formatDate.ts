import { isValid } from "date-fns/isValid";
import { format } from "date-fns/format";
import { id } from "date-fns/locale/id";

function isValidDate(date: unknown) {
  return isValid(date);
}

export default function (date: Date | string, formatType?: string) {
  const formatToDate = new Date(date);
  const isValid = isValidDate(formatToDate);
  if (!isValid) return date?.toString();
  const style = formatType || "dd MMMM yyyyy";
  return format(formatToDate, style, {
    locale: id,
  });
}
