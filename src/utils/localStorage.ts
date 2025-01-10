import { Tokens, User } from '@/types/auth';

export const storage = {
  setUserData: (user: User, tokens: Tokens) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tokens', JSON.stringify(tokens));
  },
  clearUserData: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
  },
};
