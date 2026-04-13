import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../../context/settingContext";

export default function Login() {
  const { loginUser, formData, setFormData, isLoggedIn, setTab, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user)
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{ p: 5, width: "100%", maxWidth: 420, borderRadius: 3 }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <LockOutlinedIcon sx={{ fontSize: 50, color: "#1976d2" }} />
            <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
              تسجيل الدخول
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="الآيدي"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="كلمة السر"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              onClick={loginUser}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 4, py: 1.5 }}
            >
              دخول
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography>
              ليس لديك حساب؟{" "}
              <Button
                onClick={() => setTab("regester")}
                component={Link}
                to="/register"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                إنشاء حساب جديد
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
