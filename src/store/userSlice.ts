import { authAPI } from '@/api/auth';
import { Tokens, User } from '@/types/auth';
import { storage } from '@/utils/localStorage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface UserState {
  user: User | null;
  tokens: Tokens | null;
  status: 'idle' | 'loading' | 'succeeded';
  kakaoLogin: boolean;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  tokens: JSON.parse(localStorage.getItem('tokens') || 'null'),
  status: 'idle',
  kakaoLogin: false,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(userData.email, userData.password);
      return {
        user: {
          email: response.email,
          profileImage: response.profile,
        },
        tokens: {
          access: response.access,
          refresh: response.refresh,
        },
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string; errors: any }>;
      return rejectWithValue(axiosError.response?.data || '로그인에 실패했습니다');
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { email: string; password: string; password2: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(
        userData.email,
        userData.password,
        userData.password2,
      );
      return {
        message: response.message,
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string; errors: any }>;
      return rejectWithValue(axiosError.response?.data || '회원가입에 실패했습니다');
    }
  },
);

export const kakaoLoginUser = createAsyncThunk(
  'user/kakaoLogin',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await authAPI.handleKakaoCallback(code);
      console.log(response);
      return {
        user: {
          email: response.user.email,
          profileImage: response.user.profile || null,
        },
        tokens: {
          access: response.access_token,
          refresh: response.refresh_token,
        },
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string; errors: any }>;
      return rejectWithValue(axiosError.response?.data || '카카오 로그인에 실패했습니다');
    }
  },
);

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await authAPI.logout();
    return { success: true };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return rejectWithValue(axiosError.response?.data || '로그아웃에 실패했습니다');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfileImage: (state, action) => {
      if (state.user && state.tokens) {
        state.user.profileImage = action.payload;
        storage.setUserData(state.user, state.tokens);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        storage.setUserData(state.user, state.tokens);
      })
      .addCase(loginUser.rejected, state => {
        state.status = 'idle';
      })
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, state => {
        state.status = 'succeeded';
        state.kakaoLogin = true;
      })
      .addCase(registerUser.rejected, state => {
        state.status = 'idle';
      })
      .addCase(kakaoLoginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(kakaoLoginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        storage.setUserData(state.user, state.tokens);
      })
      .addCase(logoutUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.tokens = null;
        state.status = 'idle';
        state.kakaoLogin = false;
        storage.clearUserData();
      });
  },
});

export const { updateUserProfileImage } = userSlice.actions;
export default userSlice.reducer;
