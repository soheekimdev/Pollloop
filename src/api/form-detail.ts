import { OverviewData, SummaryData } from '../types/form-details.types';
import { ParticipantsResponse, SendRequestResponse } from '../types/form-details.types';
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

// 참여자 목록 정보 관련
export const fetchParticipants = async (uuid: string) => {
  const response = await instance.get<ParticipantsResponse>(`/form/summary/users/uuid:${uuid}`);
  return response.data;
};

export const sendParticipationRequest = async (uuid: string, emails: string[]) => {
  const response = await instance.post<SendRequestResponse>(`/form/summary/users/uuid:${uuid}/request`, {
    emails,
  });
  return response.data;
};