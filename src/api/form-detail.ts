import axios from 'axios';
import { OverviewData } from '../types/form-details.types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL: 'http://43.200.4.153',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchOverviewData = async (uuid: string) => {
  try {
    const response = await axiosInstance.get<OverviewData[]>(`/formDetails?uuid=${uuid}`);
    // const response = await axiosInstance.get(`/form/summary/uuid:${uuid}`);
    //console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSummaryData = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(`summary?uuid=${uuid}`);
    // const response = await axiosInstance.get(`/form/summary/data/uuid:${uuid}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
