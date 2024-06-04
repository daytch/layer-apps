type FormTimeType = {
  hours: number;
  minutes: number;
  seconds: number;
};

function addNullIfSingleNumber(number: number) {
  if (!String(number)?.length) return "00";
  return String(number)?.length === 1 ? `0${number}` : `${number}`;
}

export const changeFormValueToValidPayload = (times: Array<FormTimeType>) => {
  const [from, to] = times.map((time) => {
    return {
      hours: addNullIfSingleNumber(time?.hours),
      minutes: addNullIfSingleNumber(time?.minutes),
      seconds: addNullIfSingleNumber(time?.seconds),
    };
  });
  const toString = `${to.hours}.${to.minutes}`;
  const fromString = `${from.hours}.${from.minutes}`;
  return `${fromString} - ${toString} WIB`;
};

export const changeAPIResponseToValidFormValue = (
  time: string
): Array<FormTimeType> | undefined => {
  if (!time?.length) return;
  const removeTimeLocation = time.replace("WIB", "").trim();
  const fromTo = removeTimeLocation.split("-");
  const formated = fromTo.map((t) => {
    const [hours, minutes, seconds] = t.split(time?.includes(":") ? ":" : ".");
    return {
      hours: Number(hours),
      minutes: Number(minutes),
      seconds: Number(seconds || "00"),
    };
  });
  return formated.length === 2 ? formated : [...formated, ...formated];
};
