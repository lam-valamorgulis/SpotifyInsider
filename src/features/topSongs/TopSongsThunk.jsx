import { useDispatch } from 'react-redux';
import { fetchApi,exchangeTokenIfNeeded } from '../../utils/consts.jsx';

// Common headers for API requests
const getHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
});

// Reusable function for making API requests
const makeApiRequest = async (url, method, headers, body, thunkAPI) => {
  return fetchApi(url, method, headers, body, thunkAPI);
};

export const getFilterSongsThunk = async (_, thunkAPI) => {
  const token = await exchangeTokenIfNeeded()
  const { acousticness,
         danceability,
         energy,
         instrumentalness,
         liveness,
         popularity,
         loudness,
         genres
        } = thunkAPI.getState().topSongs;

  const url = `https://api.spotify.com/v1/recommendations?limit=100&market=ES&seed_genres=${genres}&target_acousticness=${acousticness}&target_danceability=${danceability}&target_energy=${energy}&target_instrumentalness=${instrumentalness}&target_liveness=${liveness}&target_popularity=${popularity}&target_loudness=${loudness}`;
  const headers = getHeaders(token);

  return makeApiRequest(url, 'GET', headers, _, thunkAPI);
};

export const getRecommendSongsThunk = async (_, thunkAPI) => {
  const token = await exchangeTokenIfNeeded()
  const { topSongs } = thunkAPI.getState().topSongs;
  const topSongsIds = topSongs.map(song => song.id);

  const url = `https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${topSongsIds.join(',')}`;
  const headers = getHeaders(token);
  if (topSongsIds.length == 0) {
    return thunkAPI.rejectWithValue("Fetch top 5 songs first")
  }

  return makeApiRequest(url, 'GET', headers, _, thunkAPI);
};

export const getFeaturesThunk = async (_, thunkAPI) => {
  const token = await exchangeTokenIfNeeded()
  const { songsID } = thunkAPI.getState().topSongs;
  const url = `https://api.spotify.com/v1/audio-features?ids=${songsID.join(',')}`;
  // console.log(url, songsID, token)
  const headers = getHeaders(token);
  return makeApiRequest(url, 'GET', headers, _, thunkAPI);
};


export const getTopSongsThunk = async (_, thunkAPI) => {
  const token = await exchangeTokenIfNeeded()
  const url = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";
  const headers = getHeaders(token);
  return makeApiRequest(url, 'GET', headers, _, thunkAPI);
};

export const createPlaylistThunk = async (combineSongsURI, thunkAPI) => {
  try {
    const token = await exchangeTokenIfNeeded()
    const { user } = thunkAPI.getState().user;
    const { topSongs } = thunkAPI.getState().topSongs;
    const getUserID = user.id;

    const playlistUrl = `https://api.spotify.com/v1/users/${getUserID}/playlists`;
    const playlistHeaders = getHeaders(token);
    const playlistBody = JSON.stringify({
      "name": "My recommendation playlist",
      "description": "Top 10 songs based on top 5 played song, and top 5 songs recommended",
      "public": false
    });

    const playlistResponse = await makeApiRequest(playlistUrl, 'POST', playlistHeaders, playlistBody, thunkAPI);
    const playlistID = playlistResponse.id;

    const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${combineSongsURI.join(',')}`;
    const addTracksResponse = await makeApiRequest(addTracksUrl, 'POST', playlistHeaders, null, thunkAPI);

    return { playlistID: playlistID, addTracksResponse: addTracksResponse };
  } catch (error) {
    console.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
};

