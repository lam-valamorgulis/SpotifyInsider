import Wrapper from '../assets/wrappers/Song';
import { useDispatch } from 'react-redux';
import { PreviewSong } from '../components'
import { GoLinkExternal } from "react-icons/go";

const Song = ({name,album,external_urls,artists,preview_url}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>
          <img src={album.images[2].url} class="styled-image"/>
        </div>
        <div className='info'>
          <h5>{name}</h5>
          <p>{artists[0].name}</p>
        </div>
      </header>
      <PreviewSong audioUrl={preview_url}/>
      <div className='external-link'>
        <a href={external_urls.spotify} target="_blank">
          <GoLinkExternal className='sgv-external'/>
        </a>
      </div>
    </Wrapper>
  );
};
export default Song;
