import { authAPI } from '@/api/auth';
import { Tokens, User } from '@/types/auth';
import { storage } from '@/utils/localStorage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface UserState {
  user: User | null;
  tokens: Tokens | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  tokens: JSON.parse(localStorage.getItem('tokens') || 'null'),
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(userData.email, userData.password);
      return {
        user: {
          email: response.email,
          profileImage: null,
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
        user: {
          email: response.email,
          profileImage: null,
        },
        tokens: {
          access: response.access,
          refresh: response.refresh,
        },
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
      return {
        user: {
          email: response.email,
          profileImage: response.profile_image || null,
        },
        tokens: {
          access: response.access,
          refresh: response.refresh,
        },
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
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
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.error = null;
        storage.setUserData(state.user, state.tokens);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.error = null;
        storage.setUserData(state.user, state.tokens);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(kakaoLoginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(kakaoLoginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.error = null;
        storage.setUserData(state.user, state.tokens);
      })
      .addCase(kakaoLoginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.tokens = null;
        state.status = 'idle';
        state.error = null;
        storage.clearUserData();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { updateUserProfileImage } = userSlice.actions;
export default userSlice.reducer;
