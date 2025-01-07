import axios from 'axios';
import { OverviewData } from '../types/form-details.types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchOverviewData = async (uuid: string) => {
  try {
    const response = await axiosInstance.get<OverviewData[]>(`/formDetails?uuid=${uuid}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
