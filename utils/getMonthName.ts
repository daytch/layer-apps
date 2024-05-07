import { MONTH } from "~/constants/time";

type GetMonthIndex =
  | {
      type: "string";
      date: string;
    }
  | {
      type: "date";
      date: string | Date;
    };

export default function (index: number) {
  return MONTH[index];
}

export const getDateMonthIndex = (params: GetMonthIndex) => {
  if (params.type === "string") {
    const [month] = params.date.split("/");
    return Number(month) - 1;
  }
  return new Date(params.date).getMonth();
};
