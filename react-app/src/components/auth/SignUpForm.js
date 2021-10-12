import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth_css/Auth.css';
import './auth_css/SignupForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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
      <form onSubmit={onSignUp} className='auth-form' id='signup-form' autoComplete='off'>
      <div id="signup-logo-div"><span className='finstagram-logo'>Finstagram</span></div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            aria-label='User Name'
            placeholder='User Name'
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            aria-label='Email'
            placeholder='Email'
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
