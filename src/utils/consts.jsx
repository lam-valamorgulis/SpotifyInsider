import {Buffer} from 'buffer';
import {
  UploadOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';

export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem('tokenResponse');
  const tokenResponse = result ? JSON.parse(result) : null;
  return tokenResponse;
};

export const addTokenToLocalStorage = (token) => {
  localStorage.setItem('tokenResponse', JSON.stringify(token));
};


export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

export const ITEMS = 
  [
    {
      key: '/',
      icon: <BarChartOutlined />,
      label: 'Discovery',
    },
    {
      key: '/insider',
      icon: <VideoCameraOutlined />,
      label: 'Insider',
    },
    {
      key: '/recommend',
      icon: <UploadOutlined />,
      label: 'AI Recommend',
    },
  ]

export const CLIENT_ID = '5e3a3df75ed3404c90ab263958f2587f'
export const CLIENT_SECRET = '97f5a641d7d04fcba976393e3d435d19'

export const AUTH_QUERY_PARAMS = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: 'user-follow-read playlist-modify-private playlist-modify-public user-top-read streaming user-read-email user-read-private',
    redirect_uri: 'https://spotify-insider.vercel.app/landing',
  })

// Function to simulate token exchange with a refresh token
const exchangeToken = async (refreshToken) => {
  try {
    const resp = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      body: new URLSearchParams({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
      })
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Error exchanging token:', error);
    throw error;
  }
};

export const exchangeTokenIfNeeded = async () => {
  const storedTokenResponse = JSON.parse(localStorage.getItem('tokenResponse'));
  console.log(68,storedTokenResponse)
  
  if (storedTokenResponse) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const expirationTime = storedTokenResponse.expirationTime;
    // console.log(currentTimeInSeconds)

    if (currentTimeInSeconds >= expirationTime) {
      try {
        // Simulate token exchange by sending refresh token
        const refresh_token = storedTokenResponse.refresh_token
        const newTokenResponse = await exchangeToken(refresh_token);

        // Update the new token response in localStorage
        localStorage.setItem('tokenResponse', JSON.stringify(newTokenResponse));
        console.log('Token exchanged successfully.',newTokenResponse);
        return JSON.parse(localStorage.getItem('tokenResponse')).access_toke;
      } catch (error) {
        console.error('Token exchange failed:', error);
      }
    }
    // console.log("8888888888")
    return storedTokenResponse.access_token
  }
};


export const fetchApi = async (url, method, headers, body,thunkAPI) => {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    console.log(47, response)
    const jsonData = await response.json();
    // console.log(jsonData)
    
    // Check if the response contains an error
    if (!response.ok) {
      if (jsonData.error_description) {
        throw new Error(jsonData.error_description || 'Failed to fetch token');
      }
      throw new Error(jsonData.error.message)
    }
    return jsonData;
  } catch (error) {
    console.error(error.message)
       return thunkAPI.rejectWithValue(error.message);
  }
};

export const alertExpireToken = (payload) => {
  if (payload == 'The access token expired') {
    toast.error(
          <div>
            {payload}
            <br />
            Get new token access
          </div>,
        )
    setTimeout(() => {
      localStorage.clear()
      window.location.href = 'https://ypotify.laamdang.repl.co/landing';
    }, 3000);
  } else {
    toast.error(payload);
  }
}

