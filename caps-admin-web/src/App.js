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
import ManageAdmin from "./components/screens/super-admin/ManageAdmin";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token has expired or is invalid
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Remove the interceptor when the component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AxiosInterceptor>
          <div className="App">
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
          </div>
        </AxiosInterceptor>
      </Router>
    </AuthProvider>
  );
}

export default App;