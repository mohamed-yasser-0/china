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
import State from "./components/log/state";

function ProtectedRoute() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <Router basename="/chinaCourse/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            {/* الصفحات المحمية */}
            <Route element={<ProtectedRoute />}>
              <Route path="/state" element={<State />} />
              <Route path="/home" element={<Home />} />
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
