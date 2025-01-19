import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Food Order App</h1>
        <p>Order your favorite food with just a few clicks!</p>
        <div className="button-container">
          <button onClick={() => navigate('/user-login')}>
            Login as User
          </button>
          <button onClick={() => navigate('/admin-login')}>
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;