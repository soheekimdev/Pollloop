import { OverviewData, SummaryData } from '../types/form-details.types';
import { instance } from './axios';

export const fetchOverviewData = async (uuid: string) => {
  try {
    const response = await instance.get<OverviewData>(`/form/summary/uuid:${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSummaryData = async (uuid: string) => {
  try {
    const response = await instance.get<SummaryData>(`/form/summary/data/uuid:${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
