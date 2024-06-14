import type { SOPProgressDataType, SOPDataType } from "~/types/sop";

type SOPProgressResponse = {
  sopData: Array<SOPDataType>;
  progressData: Array<SOPProgressDataType>;
};

export function transformSOPProgressResponseData(
  data?: [
    Array<SOPDataType> | undefined,
    Array<SOPProgressDataType> | undefined
  ]
): SOPProgressResponse {
  if (!data || !data[0]?.length || !data[1]?.length)
    return {
      sopData: [],
      progressData: [],
    };
  const [sopData, progressData] = data;
  const progressDataKeys = Object.keys(progressData[0].detail || {}).map((id) =>
    Number(id)
  );

  const filteredSOPData = sopData.filter((item) =>
    progressDataKeys.includes(item.id)
  );
  return {
    sopData: filteredSOPData,
    progressData,
  };
}
