import React, { useState } from 'react';
import authService from '../services/authService';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await authService.signUp({ username, password });
      setSuccess(true);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      {success && <p>Account created! Please Sign In.</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to={'/'}>If you already have an account, sign in here </Link>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
