import favicon from '../../assets/images/favicon.svg';

const Logo = ({fade}) => {
  if (fade == 'loadFadeOut') {
    return <img src={favicon} alt='favicon logo' style = {{ 'width': '100px', 'transition' : 'width 0.5s ease-in-out' }}/>;
  } else {
    return <img src={favicon} alt='favicon logo' style = {{ 'width': '30px','transition' : 'width 0.5s ease-in-out'}}/>;
  }
  
};
export default Logo;
