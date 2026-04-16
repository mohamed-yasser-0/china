import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/settingContext";
import Home from "./components/Home/Home";
import Login from "./components/log/logIn";
import Register from "./components/log/Register";
import ProfilePage from "./components/Profile/Page";
import Layout from "./components/layout";
import DaysView from "./showData/EditData";
import WelcomePage from "./components/Home/Welcome";

function ProtectedRoute() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <Router basename="/">
        <Routes>
          <Route path="/logIn" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<WelcomePage />} />
          <Route element={<Layout />}>
            {/* الصفحات المحمية */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/daysview" element={<DaysView />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
