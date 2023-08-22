import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/MusicPlayer';


const MusicPlayer = ({playlistID}) => {
  console.log("playlistID",playlistID)
  const url = `https://open.spotify.com/embed/playlist/${playlistID}`
    return (
      <Wrapper>
         <iframe 
          style={{'minHeight': '360px' ,"border-radius":"12px"}}    
          src={url}
          allow= "encrypted-media"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          >
        </iframe>
      </Wrapper>
    )
}

export default MusicPlayer

