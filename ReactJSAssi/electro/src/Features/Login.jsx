// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const usersRes = await fetch('https://dummyjson.com/users');
//       const usersData = await usersRes.json();

//       const foundUser = usersData.users.find(user => user.email === email);

//       if (!foundUser) {
//         alert('No user found with this email');
//         setLoading(false);
//         return;
//       }

//       const loginRes = await fetch('https://dummyjson.com/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: foundUser.username,
//           password: password,
//         }),
//       });

//       const loginData = await loginRes.json();

//       if (!loginRes.ok) {
//         alert(loginData.message || 'Invalid credentials');
//         setLoading(false);
//         return;
//       }

//       dispatch(login(loginData));
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Something went wrong. Try again!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md animate-fade-in"
//       >
//         <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome Back</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="you@example.com"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-6 relative">
//           <label className="block text-gray-700 text-sm mb-1">Password</label>
//           <input
//             type={showPass ? 'text' : 'password'}
//             placeholder="••••••••"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <div
//             className="absolute top-9 right-3 text-gray-500 cursor-pointer"
//             onClick={() => setShowPass(!showPass)}
//           >
//             {showPass ? <FaEyeSlash /> : <FaEye />}
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 rounded-md text-white font-semibold transition duration-300 ${
//             loading
//               ? 'bg-indigo-300 cursor-not-allowed'
//               : 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600'
//           }`}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
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
