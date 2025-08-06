import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user?.firstName} {user?.lastName}</h2>
      <img src={user?.image} alt="Profile" width="100" />
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Phone:</strong> {user?.phone}</p>
      <p><strong>Gender:</strong> {user?.gender}</p>
      <p><strong>Age:</strong> {user?.age}</p>
      <p><strong>Blood Group:</strong> {user?.bloodGroup}</p>
      <p><strong>Eye Color:</strong> {user?.eyeColor}</p>
      <p><strong>Hair:</strong> {user?.hair?.color} ({user?.hair?.type})</p>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
