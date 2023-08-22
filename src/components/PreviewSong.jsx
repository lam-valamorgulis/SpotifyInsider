import React, { useState } from 'react';

const PreviewSong = ({audioUrl}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div style= {{paddingLeft: '50px'}}>
      <audio ref={audioRef} controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PreviewSong;
