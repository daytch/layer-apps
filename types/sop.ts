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

export type SOPDataType = {
  id: number;
  roleId: number;
  title: string;
  time: string;
  description: string;
  createdAt: string;
  updateAt: string;
};

export type SOPFormPayloadType = {
  roleId: number;
  title: string;
  description: string;
  time: string;
};

export type SOPCompletePayloadType = {
  sopId: number;
  userId: number;
};
