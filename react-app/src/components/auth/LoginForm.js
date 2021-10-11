import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './auth_css/Auth.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/feed' />;
  }

  return (
    <div id='login-form-container'>
      <form onSubmit={onLogin} id='login-form'>
        <div id="finstagram-logo">Finstagram</div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div id='login-email-div' className='outer-form-ele'>
          <input
            className='inner-form-ele'
            name='email'
            type='text'
            aria-label='Email'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div id='login-password-div' className='outer-form-ele'>
          <input
            className='inner-form-ele'
            name='password'
            type='password'
            aria-label='Password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button>Show</button>
        </div>
        <div id='login-button-div' className='outer-form-ele'>
          <button className='inner-form-ele' type='submit'>Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
