import { fetchApi,exchangeTokenIfNeeded } from '../../utils/consts.jsx';
import { CLIENT_ID, CLIENT_SECRET } from '../../utils/consts';
import {Buffer} from 'buffer';

const API_URL = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

const getHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
});

const requestOptions = {
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
  },
};

export const getTokenAccessThunk = async (codeAuth, thunkAPI) => {
  const url = "https://accounts.spotify.com/api/token";
  const body = new URLSearchParams({
    'grant_type': 'authorization_code',
    'code': codeAuth,
    'redirect_uri': "https://spotifyinsider.laamdang.repl.co/callback",
  });

  return fetchApi(url, 'POST', requestOptions.headers, body, thunkAPI);
};

export const getUserThunk = async (_, thunkAPI) => {
  const token = await exchangeTokenIfNeeded()
  const url = `${API_URL}/me`;
  return fetchApi(url, 'GET', getHeaders(token));
};

export const getFollowedArtistsThunk = async (_, thunkAPI) => {
  const token = await exchangeTokenIfNeeded()
  const url = `${API_URL}/me/following?type=artist`;
  return fetchApi(url, 'GET', getHeaders(token));
};

export const getArtistsThunk = async (_, thunkAPI) => {
  const { timeRange } = thunkAPI.getState().user;
  const token = await exchangeTokenIfNeeded()
  const url = `${API_URL}/me/top/artists/?time_range=${timeRange}`;
  console.log(54, url)
  return fetchApi(url, 'GET', getHeaders(token), _, thunkAPI);
};
