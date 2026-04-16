import React, { useContext } from "react";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { AuthContext } from "../../context/settingContext";

export default function Register() {
  const { formData, setFormData, registerUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    registerUser();

    navigate("/logIn");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 420,
            borderRadius: 3,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <PersonAddIcon sx={{ fontSize: 50, color: "#1976d2" }} />
            <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
              إنشاء حساب جديد
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="الاسم الكامل"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="ID"
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
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 4, py: 1.5 }}
            >
              إنشاء حساب
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              لديك حساب بالفعل؟{" "}
              <Link
                to="/login"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                تسجيل الدخول
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
