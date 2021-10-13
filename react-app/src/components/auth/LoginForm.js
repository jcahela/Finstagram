import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { getSessionUsersPostsThunk } from '../../store/sessionUserPosts';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { Fade } from 'react-slideshow-image'
import "react-slideshow-image/dist/styles.css"
import './auth_css/Auth.css';
import './auth_css/LoginForm.css';
import './Landing.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleState, setToggleState] = useState(false);
  const [btnText, setBtnTxt] = useState('Show');
  const [btnVisibility, setBtnVisibility] = useState('visibility-button-invisible');
  const [passwordVisibility, setPasswordVisibility] = useState('password');
  const [toggleTheme, setToggleTheme] = useState(false);
  const [easterEgg, setEasterEgg] = useState('auth-form');
  const [innerEleTheme, setInnerEleTheme] = useState('inner-form-ele');
  const [outerEleTheme, setOuterEleTheme] = useState('outer-login-form-ele');
  const [visBtnPos, setVisBtnPos] = useState('skewed-left');
  const [buttonTheme, setButtonTheme] = useState('auth-button-div');
  const [textColor, setTextColor] = useState('dark-auth-text');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const carouselImages = [
    'https://cdn.discordapp.com/attachments/886336420552269847/897666081974521856/unknown.png',
    'https://cdn.discordapp.com/attachments/886336420552269847/897875397943898122/unknown.png',
    'https://cdn.discordapp.com/attachments/886336420552269847/897666379401023508/unknown.png',
    'https://cdn.discordapp.com/attachments/886336420552269847/897666832004173824/unknown.png',
    'https://cdn.discordapp.com/attachments/886336420552269847/897666972538523668/unknown.png'
  ]

  useEffect(() => {
    const arrows = document.querySelectorAll('button.default-nav');
    arrows.forEach(arrow => arrow.style.display = "none")
  }, [])

  const themeToggleHandler = (e) => {
    if (!toggleTheme) {
      setEasterEgg('auth-form-easter-egg');
      setInnerEleTheme('inner-form-ele-easter-egg');
      setOuterEleTheme('outer-login-form-ele-easter-egg');
      setVisBtnPos('');
      setButtonTheme('auth-button-div-easter-egg');
      setTextColor('light-auth-text');
    }
    else {
      setEasterEgg('auth-form');
      setInnerEleTheme('inner-form-ele');
      setOuterEleTheme('outer-login-form-ele');
      setVisBtnPos('skewed-left');
      setButtonTheme('auth-button-div');
      setTextColor('dark-auth-text');
    }
    setToggleTheme(prevTheme => !prevTheme);
  }

  const visibilityHandler = (e) => {
    if (!toggleState) {
      setPasswordVisibility('text');
      setBtnTxt('Hide');
    } else {
      setPasswordVisibility('password');
      setBtnTxt('Show');
    }
    setToggleState(prevState => !prevState);
  }


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    await dispatch(getSessionUsersPostsThunk());
  };

  const loginAsDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
    await dispatch(getSessionUsersPostsThunk());
  }

  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => {
    const tVal = e.target.value;
    setPassword(tVal);
    if (tVal.length) setBtnVisibility('visibility-button-visible');
    else setBtnVisibility('visibility-button-invisible');
  };

  if (user) {
    return <Redirect to='/feed' />;
  }

  return (
    <div className='auth-page'>
      <div className="login-content-container">
        <div className="carousel-holder" style={{backgroundImage:"url('https://cdn.discordapp.com/attachments/886336420552269847/897622826859773972/landing-carousel-holder.png')"}}>
          <div className="slide-container carousel">
            <Fade>
              <div className="each-fade">
                <img className="carousel-image" src={carouselImages[0]} alt="carousel" />
              </div>
              <div className="each-fade">
                <img className="carousel-image" src={carouselImages[1]} alt="carousel" />
              </div>
              <div className="each-fade">
                <img className="carousel-image" src={carouselImages[2]} alt="carousel" />
              </div>
              <div className="each-fade">
                <img className="carousel-image" src={carouselImages[3]} alt="carousel" />
              </div>
              <div className="each-fade">
                <img className="carousel-image" src={carouselImages[4]} alt="carousel" />
              </div>
            </Fade>
          </div>
        </div>
        <div className="form-and-link-container">
          <form onSubmit={onLogin} id='login-form' className={easterEgg} autoComplete='off'>
            <div
              id="login-logo-div"
              className='auth-logo-div'
              onClick={themeToggleHandler}
            >
              <span className='auth-logo'>Finstagram</span>
            </div>
            <div id='login-email-div' className={outerEleTheme}>
              <input
                className={innerEleTheme}
                type='email'
                aria-label='Email'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div id='login-password-div' className={outerEleTheme}>
              <input
                className={innerEleTheme}
                type={passwordVisibility}
                aria-label='Password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button
              type='button'
              onClick={visibilityHandler}
              data-vis-btn-pos={visBtnPos}
              id={btnVisibility}
              display='none'
            >{btnText}</button>
            <div className={buttonTheme}>
              <button id='login-button' type='submit'>Log In</button>
            </div>
            <div id='login-errors-div' className='auth-errors-div'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="or-container">
              <div className="or-divider" /> <span className={textColor}>OR</span> <div className="or-divider" />
            </div>
            <span onClick={loginAsDemo} className="demo-button">Login as a Demo User</span>
          </form>
          <div className="link-to-signup-container">
                Don't have an account? <span><Link id="signup-link" className="signup-link" to="/signup">Sign up here</Link></span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
