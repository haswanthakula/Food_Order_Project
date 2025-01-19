import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import './UserLogin.css';

const UserLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const isAuthenticated = localStorage.getItem('authToken');
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if credentials match
    if (credentials.username === 'user' && credentials.password === 'user') {
      // Generate a simple auth token (in a real app, this would be from a backend)
      const authToken = btoa(`${credentials.username}:${credentials.password}`);
      
      // Store authentication token and user data
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userData', JSON.stringify({
        username: credentials.username,
        role: 'user'
      }));

      // Show success toast
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 3000
      });

      // Navigate to main app
      navigate('/home');
    } else {
      // Show error toast
      toast.error('Invalid username or password', {
        position: "top-right",
        autoClose: 3000
      });
      setError('Invalid username or password');
    }
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <button 
        className="back-to-landing-btn" 
        onClick={handleBackToLanding}
      >
        <LeftOutlined /> Back to Landing
      </button>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>User Login</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({
              ...credentials,
              username: e.target.value
            })}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({
              ...credentials,
              password: e.target.value
            })}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;