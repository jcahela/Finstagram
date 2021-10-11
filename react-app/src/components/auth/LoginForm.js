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
    <form onSubmit={onLogin} id='login-form'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id='login-email-div'>
        <input
          name='email'
          type='text'
          aria-label='Email'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div id='login-password-div'>
        <input
          name='password'
          type='password'
          aria-label='Password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button type='submit' id='login-button'>Login</button>
    </form>
  );
};

export default LoginForm;
