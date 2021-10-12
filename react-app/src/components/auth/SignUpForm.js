import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Footer from '../Footer/Footer';
import './auth_css/Auth.css';
import './auth_css/SignupForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toggleTheme, setToggleTheme] = useState(false);
  const [easterEgg, setEasterEgg] = useState('auth-form');
  const [innerEleTheme, setInnerEleTheme] = useState('inner-form-ele');
  const [outerEleTheme, setOuterEleTheme] = useState('outer-signup-form-ele');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const themeToggleHandler = (e) => {
    if (!toggleTheme) {
      setEasterEgg('auth-form-easter-egg');
      setInnerEleTheme('inner-form-ele-easter-egg');
      setOuterEleTheme('outer-signup-form-ele-easter-egg');
    }
    else {
      setEasterEgg('auth-form');
      setInnerEleTheme('inner-form-ele');
      setOuterEleTheme('outer-signup-form-ele');
    }
    setToggleTheme(prevTheme => !prevTheme);
  }


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-page'>
      <form onSubmit={onSignUp} id='signup-form' className={easterEgg} autoComplete='off'>
        <div
          id="signup-logo-div"
          className='auth-logo-div'
          onClick={themeToggleHandler}
        >
          <span className='auth-logo'>Finstagram</span>
        </div>
        <div className={outerEleTheme}>
          <input
            type='text'
            className={innerEleTheme}
            onChange={updateUsername}
            value={username}
            aria-label='Username'
            placeholder='Username'
            ></input>
        </div>
        <div className={outerEleTheme}>
          <input
            type='email'
            className={innerEleTheme}
            onChange={updateEmail}
            value={email}
            aria-label='Email'
            placeholder='user@example.io'
            ></input>
        </div>
        <div className={outerEleTheme}>
          <input
            type='password'
            className={innerEleTheme}
            onChange={updatePassword}
            value={password}
            aria-label='Password'
            placeholder='Password'
            ></input>
        </div>
        <div className={outerEleTheme}>
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
        <div className='auth-button-div'>
          <button id='signup-button' className={innerEleTheme} type='submit'>Sign Up</button>
        </div>
        <div id='signup-errors-div' className='auth-errors-div'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default SignUpForm;
