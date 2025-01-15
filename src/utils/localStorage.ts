import { Tokens, User } from '@/types/auth';

export const storage = {
  setUserData: (user: User, tokens: Tokens, isKakao: boolean) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tokens', JSON.stringify(tokens));
    localStorage.setItem('kakaoLogin', JSON.stringify(isKakao));
  },
  clearUserData: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
    localStorage.removeItem('kakaoLogin');
  },
};
