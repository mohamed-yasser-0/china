/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.js
import { Alert, Snackbar } from "@mui/material";
import { createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState([]);
  const [dayes, setDayes] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [tab, setTab] = useState("logIn");
  const today = new Date().toISOString().split("T")[0];
  const [daysData, setDaysData] = useState(() => {
    const savedData = localStorage.getItem("daysData");
    return savedData
      ? JSON.parse(savedData)
      : {
          1: [
            {
              date: `${today}`,
              students: [
                {
                  studentId: "2026001",
                  name: "أحمد محمد",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026002",
                  name: "محمد أحمد",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026003",
                  name: "عمر محمود",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026004",
                  name: "يوسف علي",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026005",
                  name: "محمود حسن",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026006",
                  name: "حسن إبراهيم",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026007",
                  name: "علي مصطفى",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026008",
                  name: "خالد عبد الله",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026009",
                  name: "إبراهيم يوسف",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026010",
                  name: "مصطفى أحمد",
                  grades: { arabic: null, english: null, bonus: null },
                },
              ],
            },
          ],
        };
  });
  const [formData, setFormData] = useState({
    name: "mohamed",
    phone: "",
    password: "12345678",
    role: "USER",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // ====================== API Functions ======================

  const loginUser = useCallback(async () => {
    try {
      const response = await fetch(
        `https://course-production-c2d8.up.railway.app/api/users/logIn`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            tab === "logIn"
              ? { phone: formData.phone, password: formData.password }
              : formData,
          ),
        },
      );

      const data = await response.json();

      if (data.status === "SUCCESS") {
        const newToken = data.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setIsLoggedIn(true);
        setSnackbar({
          open: true,
          message: "تم تحديث البيانات",
          severity: "success",
        });
      } else {
        alert(data.message || "فشلت العملية");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
  }, [tab, formData]);
  const regesterUser = useCallback(async () => {
    try {
      const response = await fetch(
        `https://course-production-c2d8.up.railway.app/api/users/regester`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.status === "SUCCESS") {
        setSnackbar({
          open: true,
          message: "تم تحديث البيانات",
          severity: "success",
        });
      } else {
        alert(data.message || "فشلت العملية");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
  }, [tab, formData]);
  const getUser = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `https://course-production-c2d8.up.railway.app/api/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.status === "SUCCESS") {
        console.log(data.data.user);
        setUser(data.data.user);
      } else {
        alert(data.message || "Failed to fetch courses");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching courses");
    }
  }, [token]);
  const getDays = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `https://course-production-c2d8.up.railway.app/api/days`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.status === "SUCCESS") {
        setDayes(data.data);
      } else {
        alert(data.message || "فشلت العملية");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
  }, [token]);
  const postDays = useCallback(
    async (dayeData) => {
      if (!token) return;

      try {
        const response = await fetch(
          `https://course-production-c2d8.up.railway.app/api/days`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dayeData),
          },
        );

        const data = await response.json();

        if (data.status === "SUCCESS") {
          alert("sucess");
          setSnackbar({
            open: true,
            message: "تم تحديث البيانات",
            severity: "success",
          });
        } else {
          alert(data.message || "فشلت العملية");
        }
      } catch (err) {
        console.error(err);
        alert("حدث خطأ في الاتصال بالسيرفر");
      }
    },
    [token],
  );

  // جلب الكورسات تلقائياً بعد اللوجن
  useEffect(() => {
    if (!isLoggedIn || !token) return;

    const timer = setTimeout(() => {
      getDays();
      getUser();
    }, 0);

    return () => clearTimeout(timer);
  }, [isLoggedIn, token, getDays, getUser]);

  /* Snackbar */
  <Snackbar
    open={snackbar.open}
    autoHideDuration={2500}
    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert
      severity={snackbar.severity}
      onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
    >
      {snackbar.message}
    </Alert>
  </Snackbar>;

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        tab,
        setTab,
        formData,
        setFormData,
        loginUser,
        dayes,
        postDays,
        regesterUser,
        snackbar,
        setSnackbar,
        user,
        setCurrentDay,
        currentDay,
        daysData,
        setDaysData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
