import React, { useContext, useState } from "react";
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
  const {formData, setFormData, setTab, regesterUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // التحقق من المدخلات
    if (
      !formData.name ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("كلمة السر وتأكيدها غير متطابقين");
      return;
    }

    if (formData.password.length < 3) {
      setError("كلمة السر يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    regesterUser()
    navigate("/")
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

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

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
              label="الآيدي (ID)"
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

            <TextField
              fullWidth
              label="تأكيد كلمة السر"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              onClick={() => {handleSubmit();}}
              type="submit"
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
