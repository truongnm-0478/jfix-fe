import { ReportCreate } from "@/dataHelper/report.dataHelper";
import { reportApi } from "@/services/api/reportApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useReport = () => {
  return useQuery({
    queryKey: ["report"],
    queryFn: () => reportApi.getReports(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useReportUnread = () => {
  return useQuery({
    queryKey: ["reportUnread"],
    queryFn: () => reportApi.getReportUnread(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateReport = () => {
  return useMutation({
    mutationFn: (data: ReportCreate) => reportApi.createReport(data),
  });
};

export const useMarkAsRead = () => {
  return useMutation({
    mutationFn: (reportId: number) => reportApi.markAsRead(reportId),
  });
};
