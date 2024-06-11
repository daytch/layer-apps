import { cashflowRepository } from "~/repository/modules/cashflow";
import { fcrChartRepository } from "~/repository/modules/fcr-chart";
import { userRepository } from "~/repository/modules/user";
import type { FCRChartParams } from "~/types/fcr-chart";

export const useFetchDashboard = () => {
  const { $api } = useNuxtApp();
  const fcrRepo = fcrChartRepository($api);
  const userRepo = userRepository($api);
  const cashflowRepo = cashflowRepository($api);

  const getFCRChartData = (fcrParams: FCRChartParams) => {
    if (!fcrParams?.coopId) return;
    return fcrRepo.getCoopFCRChartByPeriod(fcrParams);
  };

  const getDashboardData = async ({
    frcParams,
  }: {
    frcParams: FCRChartParams;
  }) => {
    const response = await Promise.all([
      getFCRChartData(frcParams),
      userRepo.getAllUsers(),
      cashflowRepo.getAllCashflow(),
    ]);
    if (!!response?.length) {
      return {
        fcrData: response?.[0]?.data,
        userData: response?.[1]?.data,
        totalCashflow: response?.[2]?.data?.total || 0,
      };
    }
  };

  return { getDashboardData };
};
