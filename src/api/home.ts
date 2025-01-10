import axios from 'axios';
import { HomeUserData } from '../types/home/home.types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHomeData = async (userId: number) => {
  try {
    const response = await axiosInstance.get<HomeUserData[]>(`/home?userId=${userId}`);
    // console.log(response);
    return response.data[0];
  } catch (error) {
    throw error;
  }
};
