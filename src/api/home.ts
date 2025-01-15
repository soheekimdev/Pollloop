import { FormDetails } from '../types/home/home.types';
import { instance } from './axios';

const getLastFourItems = (data: FormDetails[]): FormDetails[] => {
  return data.slice(-3);
};

export const fetchHomeData = async () => {
  try {
    const response = await instance.get<FormDetails[]>(`/form/list/`); // BE-FOR008로 대체
    // console.log('response', response);
    const data = {
      forms: getLastFourItems(response.data),
      asks: [
        {
          author_id: 111,
          id: 211,
          title: '코딩 부트캠프 수료생의 실무 적응기 ',
          tag: '실시간 멘토링',
          is_closed: false,
          access_code: 'BOOTCAMP',
        },
        {
          author_id: 111,
          id: 212,
          title: '테크 리드가 알려주는 클린코드 레시피',
          tag: '코드맛집',
          is_closed: false,
          access_code: 'CLEANCODE',
        },
        {
          author_id: 111,
          id: 222,
          title: '주니어 개발자의 속 시원한 Q&A',
          tag: '주니어의 무물타임',
          is_closed: true,
          access_code: 'JUNIOR24',
        },
      ],
    };

    return data;
  } catch (error) {
    throw error;
  }
};
