import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPlaylistThunk, getTopSongsThunk,getRecommendSongsThunk, getFeaturesThunk,getFilterSongsThunk } from './TopSongsThunk';
import { alertExpireToken } from '../../utils/consts.jsx';

export const getFeatures = createAsyncThunk('topSongs/getFeatures', getFeaturesThunk);
export const getTopSongs = createAsyncThunk('topSongs/getTopSongs', getTopSongsThunk);
export const getRecommendSongs = createAsyncThunk('topSongs/getRecommendSongs', getRecommendSongsThunk);
export const createPlaylist = createAsyncThunk('topSongs/createPlaylist', createPlaylistThunk);
export const getFilterSongs = createAsyncThunk('topSongs/getFilterSongs', getFilterSongsThunk);

const initSongsFilter = {
  acousticness : 0,
  danceability : 0,
  energy : 0,
  instrumentalness : 0,
  liveness : 0,
  popularity : 0,
  loudness : 0,
  genres:'acoustic',
}

const initialState = {
  ...initSongsFilter,
  isLoading : false,
  isShowingMusic: false,
  topSongs : [],
  recommendSongs: [],
  playlistID: '',
  featureAudio: [],
  searchSongsFilter: [],
  songsID : [],
  topSongsName : []
}

const topSongsSlice = createSlice({
  name: 'topSongs',
  initialState,
  reducers: {
    createPlaylistID: (state, {payload}) => {
      state.playlistID = payload
      console.log(state.playlistID)
    },
    featureUpdate : (state, {payload:{name,value}}) => {
      console.log(name,value)
      state[name] = value
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopSongs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopSongs.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          // console.log(payload)
          state.topSongs = payload.items;
          state.songsID = payload.items.map((song) => song.id)
          state.topSongsName = payload.items.map((song) => song.name)
        })
      .addCase(getTopSongs.rejected, (state, { payload }) => {
          state.isLoading = false;
          alertExpireToken(payload)
        })
      .addCase(getRecommendSongs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecommendSongs.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          state.isShowingMusic = true;
          // console.log(payload)
          state.recommendSongs = payload.tracks;
        })
      .addCase(getRecommendSongs.rejected, (state, { payload }) => {
          state.isLoading = false;
          // console.log(payload)
          alertExpireToken(payload)
        })
      .addCase(createPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlaylist.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          // console.log(payload)
          state.playlistID = payload.playlistID;
        })
      .addCase(createPlaylist.rejected, (state, { payload }) => {
          state.isLoading = false;
          // console.log(payload)
          alertExpireToken(payload)
        })
      .addCase(getFeatures.pending, (state, { payload }) => {
          state.isLoading = true;
        })
      .addCase(getFeatures.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          state.featureAudio = payload.audio_features;
          console.log(state.featureAudio)
        })
      .addCase(getFeatures.rejected, (state, { payload }) => {
          state.isLoading = false;
          alertExpireToken(payload)
        })
      .addCase(getFilterSongs.pending, (state, { payload }) => {
          state.isLoading = true;
        })
      .addCase(getFilterSongs.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          // console.log("tesstttttt",payload)
          state.searchSongsFilter = payload.tracks;
        })
      .addCase(getFilterSongs.rejected, (state, { payload }) => {
          state.isLoading = false;
        // console.log("tesstttttt",payload)
          alertExpireToken(payload)
        })
  }
})

export const { sendLoading, featureUpdate} = topSongsSlice.actions;

export default topSongsSlice.reducer;
