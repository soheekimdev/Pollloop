import axios from 'axios';
import { FormListItem, FormListResponse, FormStatus } from '../types/forms/forms.types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL: 'http://43.200.4.153',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 나의 폼 리스트 조회 */
export const fetchFormListData = async () => {
  try {
    const response = await axiosInstance.get<FormListResponse>('/form/list/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* 폼 삭제 */
export const fetchFormDeleteData = async (formIds: string[]) => {
  try {
    const response = await axiosInstance.post('/form/list/remove/', {
      uuids: formIds
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* 폼 즐겨찾기 수정 */
export const fetchFormBookmarkData = async (uuid: string, isBookmark: boolean) => {
  try {
    const response = await axiosInstance.post<FormListItem>('/form/list/bookmark/', {
      uuid,
      is_bookmark: isBookmark
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* 폼 결과 데이터 조회 */
export const fetchFormResultData = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(`/form/summary/uuid:${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 폼 미리보기 데이터 조회
 * TODO: API 경로 확정 후 수정 필요
 */
export const fetchFormPreviewData = async (uuid: string) => {
  try {
    // const response = await axiosInstance.get(`/form/preview/${uuid}`);
    // return response.data;
    throw new Error('API 경로가 아직 정의되지 않았습니다.');
  } catch (error) {
    throw error;
  }
};