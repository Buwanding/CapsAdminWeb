// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/screens/Login";
import { Dashboard } from "./components/screens/Dashboard";
import { Feedback } from "./components/screens/Feedback";
import  RidersList  from "./components/screens/riders/RidersList";
import { ManageUser }  from "./components/screens/ManageUser";
import { BookingHistory } from "./components/screens/BookingHistory";
import { RidersApplicant } from "./components/screens/riders/RidersApplicant";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/riderslist" element={<RidersList />} />
          <Route path="/ridersapplicant" element={<RidersApplicant />} />
          <Route path="/manageuser" element={<ManageUser />} />
          <Route path="/bookinghistory" element={<BookingHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
