import { Report, ReportCreate, ReportCreateResponse } from '@/dataHelper/report.dataHelper';
import axiosClient from './axiosClient';
import { ApiResponse } from './type';

export const reportApi = {
  getReports: (): Promise<ApiResponse<Report[]>> =>
    axiosClient.get('/reports'),

  getReportUnread: (): Promise<ApiResponse<Report[]>> =>
    axiosClient.get('/reports/unread'),

  createReport: (data: ReportCreate): Promise<ApiResponse<ReportCreateResponse>> =>
    axiosClient.post('/reports', data),

  markAsRead: (reportId: number): Promise<ApiResponse<any>> =>
    axiosClient.patch(`/reports/${reportId}/read`),
}