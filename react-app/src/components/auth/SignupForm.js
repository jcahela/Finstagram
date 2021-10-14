import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import Footer from '../Footer/Footer';
import './auth_css/Auth.css';
import './auth_css/SignupForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toggleTheme, setToggleTheme] = useState(false);
  const [easterEgg, setEasterEgg] = useState('auth-form');
  const [innerEleTheme, setInnerEleTheme] = useState('inner-form-ele');
  const [buttonTheme, setButtonTheme] = useState('auth-button-div');
  const [errorsTheme, setErrorsTheme] = useState('auth-errors-div');
  const [textColor, setTextColor] = useState('dark-auth-text');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const themeToggleHandler = (e) => {
    if (!toggleTheme) {
      setEasterEgg('auth-form-easter-egg');
      setInnerEleTheme('inner-form-ele-easter-egg');
      setErrorsTheme('auth-errors-div-easter-egg');
      setButtonTheme('auth-button-div-easter-egg');
      setTextColor('light-auth-text');
    }
    else {
      setEasterEgg('auth-form');
      setInnerEleTheme('inner-form-ele');
      setErrorsTheme('auth-errors-div');
      setButtonTheme('auth-button-div');
      setTextColor('dark-auth-text');
    }
    setToggleTheme(prevTheme => !prevTheme);
  }


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstname, lastname, username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Password fields do not match.'])
    }
  };

  const updateUsername = (e) => setUsername(e.target.value);

  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => setPassword(e.target.value);

  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-page'>
      <div className="form-and-link-container">
        <form onSubmit={onSignUp} id='signup-form' className={easterEgg} autoComplete='off'>
          <div id="signup-logo-div" className='auth-logo-div' onClick={themeToggleHandler}>
            <span className='auth-logo'>Finstagram</span>
            <p id='signup-form-text' className={textColor}>Sign up to see photos and videos from your friends.</p>
          </div>
          <div className='outer-signup-form-ele'>
            <input
              type='text'
              className={innerEleTheme}
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              aria-label='First Name'
              placeholder='First Name'
            ></input>
          </div>
          <div className='outer-signup-form-ele'>
            <input
              type='text'
              className={innerEleTheme}
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              aria-label='Last Name'
              placeholder='Last Name'
              ></input>
          </div>
          <div className='outer-signup-form-ele'>
            <input
              type='text'
              className={innerEleTheme}
              onChange={updateUsername}
              value={username}
              aria-label='Username'
              placeholder='Username'
              ></input>
          </div>
          <div className='outer-signup-form-ele'>
            <input
              type='email'
              className={innerEleTheme}
              onChange={updateEmail}
              value={email}
              aria-label='Email'
              placeholder='user@example.io'
              ></input>
          </div>
          <div className='outer-signup-form-ele'>
            <input
              type='password'
              className={innerEleTheme}
              onChange={updatePassword}
              value={password}
              aria-label='Password'
              placeholder='Password'
              ></input>
          </div>
          <div className='outer-signup-form-ele'>
            <input
              type='password'
              className={innerEleTheme}
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              aria-label='Repeat Password'
              placeholder='Repeat Password'
              ></input>
          </div>
          <div className='signup-button-and-errors-div'>
            <button  id='signup-button' className={buttonTheme} type='submit'>Sign Up</button>
            <div id='signup-errors-div' className={errorsTheme}>
              {errors.map((error, ind) => (
               <div key={ind}>{error}</div>
                ))}
            </div>
          </div>
        </form>
        <div className="link-to-login-container">
            Have an account? <span><Link id="login-link" className="login-link" to="/login"><b>Log in</b></Link></span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpForm;
