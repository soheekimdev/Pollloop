import { FormDetails } from '../types/home/home.types';
import { instance } from './axios';

const getLastFourItems = (data: FormDetails[]): FormDetails[] => {
  return data.slice(-4);
};

export const fetchHomeData = async (userId: string) => {
  try {
    const response = await instance.get<FormDetails[]>(`/form/list/user_id:${userId}/`); // BE-FOR008로 대체
    console.log('response', response.data);
    const data = {
      forms: getLastFourItems(response.data),
      asks: [
        {
          author_id: 111,
          id: 211,
          title: '첫 번째 애스크',
          tag: '6기만족도',
          is_closed: false,
          access_code: 'ABC123',
        },
        {
          author_id: 111,
          id: 212,
          title: '두 번째 애스크',
          tag: '6기',
          is_closed: false,
          access_code: 'ABC123',
        },
        {
          author_id: 111,
          id: 222,
          title: '세 번째 애스크',
          tag: '6기만족도',
          is_closed: true,
          access_code: 'ABC123',
        },
      ],
    };

    return data;
  } catch (error) {
    throw error;
  }
};
