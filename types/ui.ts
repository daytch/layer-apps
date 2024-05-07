export type SelectOptionType = {
  label: string;
  value: string;
};

export type TableHeaderType = {
  label: string;
  key: string;
  visible: boolean;
  rowSpan?: number;
  colSpan?: number;
  subHeader?: TableHeaderType[];
};
