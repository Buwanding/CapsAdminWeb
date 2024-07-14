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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/riderslist" element={<RidersList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
