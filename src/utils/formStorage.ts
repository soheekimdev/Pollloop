// 저장될 데이터의 타입 정의
interface FormSendTime {
  uuid: string;
  last_send: string;
}

const STORAGE_KEY = 'form_send_times';

// 모든 폼 전송 시간 데이터 가져오기
export const getFormSendTimes = (): FormSendTime[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// 특정 폼의 마지막 전송 시간 가져오기
export const getFormLastSendTime = (uuid: string): string | null => {
  try {
    const times = getFormSendTimes();
    const formTime = times.find(item => item.uuid === uuid);
    return formTime?.last_send || null;
  } catch (error) {
    console.error('Error getting form last send time:', error);
    return null;
  }
};

// 폼의 전송 시간 업데이트/추가
export const updateFormSendTime = (uuid: string): void => {
  try {
    const times = getFormSendTimes();
    const currentTime = new Date().toISOString();
    const existingIndex = times.findIndex(item => item.uuid === uuid);

    if (existingIndex >= 0) {
      times[existingIndex].last_send = currentTime;
    } else {
      times.push({ uuid, last_send: currentTime });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(times));
  } catch (error) {
    console.error('Error updating form send time:', error);
  }
};

// 폼의 전송 시간 정보 삭제
// 특정 시간으로 폼의 전송 시간 설정 (테스트나 수동 설정용)
export const setFormSendTime = (uuid: string, time: string): void => {
  try {
    const times = getFormSendTimes();
    const existingIndex = times.findIndex(item => item.uuid === uuid);

    if (existingIndex >= 0) {
      times[existingIndex].last_send = time;
    } else {
      times.push({ uuid, last_send: time });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(times));
  } catch (error) {
    console.error('Error setting form send time:', error);
  }
};

export const removeFormSendTime = (uuid: string): void => {
  try {
    const times = getFormSendTimes();
    const filteredTimes = times.filter(item => item.uuid !== uuid);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTimes));
  } catch (error) {
    console.error('Error removing form send time:', error);
  }
};
