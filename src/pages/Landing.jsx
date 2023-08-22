import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
import {AUTH_QUERY_PARAMS} from '../utils/consts'
import { useSelector, useDispatch } from 'react-redux';
import { getAccess } from '../features/user/userSlice';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const linkCode = 'https://accounts.spotify.com/authorize?' + AUTH_QUERY_PARAMS.toString()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <nav style={{'paddingTop' : '30px'}}>
        <Logo fade='loadFadeOut'/>
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            spotify <span>insider</span> app
          </h1>
          <p>
            Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
            fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
            crucifix heirloom meggings bicycle rights.
          </p>
          {/* <div className='btn btn-hero' onClick = {handleClickAccess}>
            Welcome */}
            <Link to={linkCode} className='btn btn-hero'>
              Welcome
            </Link>
          {/* </div> */}
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
