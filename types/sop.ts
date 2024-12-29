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
  isReduceStock: boolean;
};

export type SOPFormPayloadType = {
  roleId: number;
  title: string;
  description: string;
  time: string;
  isReduceStock: boolean;
};

export type SOPCompletePayloadType = {
  sopId: number;
  userId: number;
  coopId: number;
  feedId?: number;
  qty?: number;
};

export type SOPProgressDataType = {
  id: number;
  name: string;
  detail: Record<string, boolean>;
  date: string;
};

export type SOPByUserDataType = {
  id: number;
  roleId: number;
  title: string;
  time: string;
  description: string;
  createdAt: string;
  updateAt: string;
  status: boolean;
  isReduceStock: boolean;
};
