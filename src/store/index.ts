import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import userReducer from '@/store/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    forms: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;