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
    return fcrRepo.getCoopFCRChartByPeriod({ ...fcrParams });
  };

  const getDashboardData = async () => {
    const response = await Promise.all([
      userRepo.getAllUsers(),
      cashflowRepo.getAllCashflow(),
    ]);
    if (!!response?.length) {
      return {
        userData: response?.[0]?.data,
        totalCashflow: response?.[1]?.data?.total || 0,
      };
    }
  };

  return { getDashboardData, getFCRChartData };
};
