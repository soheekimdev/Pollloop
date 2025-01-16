import { OverviewData, SummaryData, Participant } from '../types/form-details.types';
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

// 참여자 목록 탭 관련
export const fetchParticipantsList = async (uuid: string) => {
  try {
    const response = await instance.get<Participant[]>(`/form/summary/users/uuid:${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendParticipationReminder = async (uuid: string) => {
  try {
    const response = await instance.post('/form/send-mail/', { uuid });
    return response.data;
  } catch (error) {
    throw error;
  }
};