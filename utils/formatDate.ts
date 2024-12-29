import { isValid } from "date-fns/isValid";
import { format } from "date-fns/format";
import { id } from "date-fns/locale/id";
import { MONTH } from "~/constants/time";

function isValidDate(date: unknown) {
  return isValid(date);
}

export default function (date: Date | string, formatType?: string) {
  const formatToDate = new Date(date);
  const isValid = isValidDate(formatToDate);
  if (!isValid) return date?.toString();
  const style = formatType || "dd MMMM yyyy";
  return format(formatToDate, style, {
    locale: id,
  });
}

export const getPeriodeText = (periodeValue: string) => {
  if (!periodeValue?.length) return "";
  return `${getMonthName(
    getDateMonthIndex({ type: "string", date: periodeValue })
  )} ${periodeValue.split("/")[1]}`;
};

export const getFieldPeriodText = (period?: {
  month: number;
  year: number;
}) => {
  if (!period || period?.month < 0 || !period?.year) return "";
  return `${MONTH[period?.month]} ${period.year}`;
};
