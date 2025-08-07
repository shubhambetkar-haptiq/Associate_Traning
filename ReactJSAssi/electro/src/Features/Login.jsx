
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usersRes = await fetch('https://dummyjson.com/users');
      const usersData = await usersRes.json();
      const foundUser = usersData.users.find(user => user.email === email);

      if (!foundUser) {
        alert('No user found with this email');
        return;
      }

      const loginRes = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: foundUser.username,
          password: password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        alert(loginData.message || 'Invalid credentials');
        return;
      }

      dispatch(login(loginData));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Try again!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <div className="mb-3">
          <label className="block mb-1 text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full border px-3 py-2 rounded text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border px-3 py-2 rounded text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
