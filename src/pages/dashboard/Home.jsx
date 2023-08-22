import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenAccess,getUser,getAccess } from '../../features/user/userSlice';
import { MusicPlayer, Discovery} from '../../components'
import { Spin } from 'antd';
import { createPlaylist } from '../../features/topSongs/topSongsSlice';
import { isObjectEmpty } from '../../utils/consts'

export default function Home() {
  console.log("homeeeeeeee")
  const {
         playlistID,
         topSongs,
         recommendSongs,
         isShowingMusic,
        } = useSelector((store) => store.topSongs);
  
  const {isLoading,
         user,
         access
        } = useSelector((store) => store.user);

  // console.log("24",token,(isObjectEmpty(token)))
  const dispatch = useDispatch();
  
  const params = new URLSearchParams(location.search);
  const codeAuth = params.get('code');
  
  useEffect(() => {
    dispatch(getAccess())
    if (codeAuth) {
      dispatch(getTokenAccess(codeAuth));
    }
    }, [codeAuth, dispatch]);

  useEffect(() => {
    if (isShowingMusic) {
      const songsURI = topSongs.map((song) => song.uri);
      const recommendedSongsURI = recommendSongs.map((song) => song.uri);
      const combineSongsURI = songsURI.concat(recommendedSongsURI);
      dispatch(createPlaylist(combineSongsURI));
    }
  }, [isShowingMusic, topSongs, recommendSongs, dispatch]);

  return (
    <>
      <Discovery />
      { playlistID && <MusicPlayer playlistID={playlistID}/>}
    </>
  )
}


