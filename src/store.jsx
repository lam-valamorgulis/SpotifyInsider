import { configureStore } from '@reduxjs/toolkit';
import topSongsSlice from './features/topSongs/topSongsSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    topSongs: topSongsSlice,
    user: userSlice,
  },
});
