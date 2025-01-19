import { useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div className="admin-title">
        <h1>Admin Dashboard</h1>
      </div>
      <button className="admin-logout" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default AdminNavbar;