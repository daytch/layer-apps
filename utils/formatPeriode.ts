const MONTH_DATE = {
  0: "Januari",
  1: "Februari",
  2: "Maret",
  3: "April",
  4: "Mei",
  5: "Juni",
  6: "Juli",
  7: "Agustus",
  8: "September",
  9: "Oktober",
  10: "November",
  11: "Desember",
};

export const changeInputTypeToString = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  return `${MONTH_DATE[month as keyof typeof MONTH_DATE]} ${year}`;
};
