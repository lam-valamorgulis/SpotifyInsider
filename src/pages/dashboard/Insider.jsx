import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Analytic, User } from '../../components'
import { getTopSongs } from '../../features/topSongs/topSongsSlice';

const Insider = () => {
  const { topSongsName: songsName } = useSelector((store) => store.topSongs);
const dispatch = useDispatch();
  
  useEffect(() => {
    if (songsName.length == 0) {
      dispatch(getTopSongs())
    }
  },[songsName])
 
  return (
    <>
      <User/>
      {songsName.length != 0 && <Analytic/>}
    </>
  )
}
export default Insider;