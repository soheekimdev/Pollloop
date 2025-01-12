import { HomeUserData } from '../types/home/home.types';
import { instance } from './axios';

export const fetchHomeData = async (userId: string) => {
  try {
    const response = await instance.get<HomeUserData>(`/home?userId=${userId}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
