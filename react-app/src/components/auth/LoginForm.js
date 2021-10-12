import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { getSessionUsersPostsThunk } from '../../store/sessionUserPosts';
import Footer from '../Footer/Footer'
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

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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
      <form onSubmit={onLogin} id='login-form' className='auth-form' autoComplete='off'>
        <div id="login-logo-div" className='auth-logo-div'>
          <span className='auth-logo'>Finstagram</span>
        </div>
        <div id='login-email-div' className='outer-form-ele'>
          <input
            className='inner-form-ele'
            type='email'
            aria-label='Email'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div id='login-password-div' className='outer-form-ele'>
          <input
            className='inner-form-ele'
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
          id={btnVisibility}
          display='none'
        >{btnText}</button>
        <div className='auth-button-div'>
          <button id='login-button' className='inner-form-ele' type='submit'>Log In</button>
        </div>
        <div id='login-errors-div' className='auth-errors-div'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </form>
      <Footer className='footer' />
    </div>
  );
};

export default LoginForm;
