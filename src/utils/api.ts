export const API_URL = 'http://localhost:3001';

// 엔드포인트
export const API_ENDPOINTS = {
  USERS: `${API_URL}/users`,
  FORMS: `${API_URL}/forms`,
  FORM_DETAILS: `${API_URL}/formDetails`,
  ASKS: `${API_URL}/asks`,
} as const;

/* API 요청 예시

const getForms = async () => {
  try {
    const response = await axios.get(API.forms);
    return response.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

*/
