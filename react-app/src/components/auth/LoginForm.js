import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { getSessionUsersPostsThunk } from '../../store/sessionUserPosts';
import Footer from '../Footer/Footer';
import './auth_css/Auth.css';
import './auth_css/LoginForm.css';

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

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const themeToggleHandler = (e) => {
    if (!toggleTheme) {
      setEasterEgg('auth-form-easter-egg');
      setInnerEleTheme('inner-form-ele-easter-egg');
      setOuterEleTheme('outer-login-form-ele-easter-egg');
      setVisBtnPos('');
    }
    else {
      setEasterEgg('auth-form');
      setInnerEleTheme('inner-form-ele');
      setOuterEleTheme('outer-login-form-ele');
      setVisBtnPos('skewed-left');
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
    await dispatch(getSessionUsersPostsThunk())
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

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
        <div className='auth-button-div'>
          <button id='login-button' className={innerEleTheme} type='submit'>Log In</button>
        </div>
        <div id='login-errors-div' className='auth-errors-div'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default LoginForm;
