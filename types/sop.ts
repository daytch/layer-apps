export type SOPItem = {
  id: string;
  title: string;
  time: string;
  isDone: boolean;
};

export type ManagementSOP = {
  sop: string;
  user: string;
  time: string;
  id: string;
};

export type SOPProgress = {
  id: string;
  name: string;
  title: string;
  isDone: boolean;
};
