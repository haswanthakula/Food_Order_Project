import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import AuthContext from '../store/AuthContext';
import { toast } from 'react-toastify';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin123') {
      authCtx.login();
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div className="admin-login-container">
      <button 
        className="back-to-landing-btn" 
        onClick={handleBackToLanding}
      >
        <LeftOutlined /> Back to Landing
      </button>
      
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;