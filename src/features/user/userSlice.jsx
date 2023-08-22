import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getTokenAccessThunk, getUserThunk, getFollowedArtistsThunk} from './userThunk';
import { getArtistsThunk } from './userThunk';
import { getTokenFromLocalStorage,alertExpireToken,addTokenToLocalStorage } from '../../utils/consts.jsx';



export const getTokenAccess = createAsyncThunk('user/getTokenAccess', getTokenAccessThunk);
export const getUser = createAsyncThunk('user/getUser', getUserThunk);
export const getFollowedArtists = createAsyncThunk('getFollowedArtists', getFollowedArtistsThunk);
export const getArtists = createAsyncThunk('user/getArtists',getArtistsThunk)


const initialState = {
  timeRange: 'medium_term',
  isLoading: false,
  isGetUser : false,
  user : {},
  followedArtist: [],
  topArtists: [],
  // tokenUser : getTokenFromLocalStorage(),
  access: null,
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    timeFilter: (state, {payload}) => {
      state.timeRange = payload
      console.log(payload, state.timeRange)
    },
    getAccess: (state, {payload}) => {
      console.log(535353535353535353)
      state.access = true
      console.log(state.access)
    },
  },
  extraReducers : (builder) => {
    builder
      .addCase(getTokenAccess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenAccess.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        let payLoadWithExpireTime = { ...payload };
        payLoadWithExpireTime['expirationTime'] = Math.floor(Date.now() / 1000) + payload.expires_in;
        // localStorage.setItem('tokenResponse', JSON.stringify(payLoadWithExpireTime));
        state.isGetUser = true;
        // state.tokenUser = payLoadWithExpireTime;
        // console.log(token)
         addTokenToLocalStorage(payLoadWithExpireTime)
        })
      .addCase(getTokenAccess.rejected, (state, {payload}) => {
        state.isLoading = false;
        alertExpireToken(payload)
        })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.user = payload;
        console.log(state.user)
      })
      .addCase(getUser.rejected, (state, {payload}) => {
          state.isLoading = false;
          alertExpireToken(payload)
        })
      .addCase(getFollowedArtists.pending, (state) => {
          state.isLoading = true;
        })
      .addCase(getFollowedArtists.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          state.followedArtist = payload.artists.items;
        })
      .addCase(getFollowedArtists.rejected, (state, { payload }) => {
          state.isLoading = false;
          alertExpireToken(payload)
        })
      .addCase(getArtists.pending, (state) => {
          state.isLoading = true;
        })
      .addCase(getArtists.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          console.log(payload.items)
          state.topArtists = payload.items;
        })
      .addCase(getArtists.rejected, (state, { payload }) => {
          state.isLoading = false;
          alertExpireToken(payload)
      })
  }
})

export const { timeFilter,getAccess } = userSlice.actions;

export default userSlice.reducer;