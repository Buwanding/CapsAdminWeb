// src/App.js
import React, { useEffect } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import Login from "./components/screens/Login";
import { Dashboard } from "./components/screens/Dashboard";
import { Feedback } from "./components/screens/Feedback";
import RidersList from "./components/screens/riders/RidersList";
import { ManageUser } from "./components/screens/ManageUser";
import { BookingHistory } from "./components/screens/BookingHistory";
import { RidersApplicant } from "./components/screens/riders/RidersApplicant";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import ManageAdmin from "./components/screens/super-admin/ManageAdmin";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token has expired or is invalid
          logout();
          navigate('/');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Remove the interceptor when the component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, logout]);

  return children;
};

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>; // Or a more sophisticated loading indicator
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/riderslist" element={<RidersList />} />
      <Route path="/ridersapplicant" element={<RidersApplicant />} />
      <Route path="/manageuser" element={<ManageUser />} />
      <Route path="/bookinghistory" element={<BookingHistory />} />
      <Route path="/manageadmin" element={<ManageAdmin />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AxiosInterceptor>
          <div className="App">
            <AppContent />
          </div>
        </AxiosInterceptor>
      </Router>
    </AuthProvider>
  );
}

export default App;