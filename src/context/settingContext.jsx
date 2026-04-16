/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

export const AuthContext = createContext();
const today = new Date().toISOString().split("T")[0];

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [dayes, setDayes] = useState([]);
  const [single, setsingle] = useState([]);
  const [currentDay, setCurrentDay] = useState(2);
  const [daysData, setDaysData] = useState(() => {
    const savedData = localStorage.getItem("daysData");
    return savedData
      ? JSON.parse(savedData)
      : {
          1: [
            {
              date: today,
              students: [
                {
                  studentId: "2026001",
                  name: "علي1",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026002",
                  name: "محمود وائل طاحون",
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
          2: [
            {
              date: today,
              students: [
                {
                  studentId: "2026001",
                  name: "عباس",
                  grades: { arabic: null, english: null, bonus: null },
                },
                {
                  studentId: "2026002",
                  name: "محمود وائل طاحون",
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
    name: "",
    phone: "",
    password: "",
    role: "USER",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  // ====================== Snackbar Helper ======================
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ====================== API Functions ======================

  const loginUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://course-production-c2d8.up.railway.app/api/users/logIn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: formData.phone,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (data.status === "SUCCESS") {
        const newToken = data.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setIsLoggedIn(true);
        showSnackbar("تم تسجيل الدخول بنجاح", "success");
        setUser(data.data.user);
      } else {
        showSnackbar(data.message || "فشل تسجيل الدخول", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("حدث خطأ في الاتصال بالسيرفر", "error");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const registerUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://course-production-c2d8.up.railway.app/api/users/regester",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.status === "SUCCESS") {
        // console.log("done")
        showSnackbar("تم إنشاء الحساب بنجاح", "success");
      } else {
        showSnackbar(data.message || "فشل إنشاء الحساب", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("حدث خطأ في الاتصال بالسيرفر", "error");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const getUser = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://course-production-c2d8.up.railway.app/api/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (data.status === "SUCCESS") {
        setUser(data.data.user);
      } else {
        showSnackbar(data.message || "فشل جلب بيانات المستخدم", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("خطأ في جلب بيانات المستخدم", "error");
    }
  }, [token]);

  const getDays = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://course-production-c2d8.up.railway.app/api/days",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await response.json();
      if (data.status === "SUCCESS") {
        setDayes(data.data);
      } else {
        showSnackbar(data.message || "فشل جلب الأيام", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("خطأ في جلب بيانات الأيام", "error");
    }
  }, [token]);

  const postDays = useCallback(
    async (dayData) => {
      if (!token || !dayData) return;

      setLoading(true);
      try {
        const response = await fetch(
          "https://course-production-c2d8.up.railway.app/api/days",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dayData),
          },
        );

        const data = await response.json();

        if (data.status === "SUCCESS") {
          showSnackbar("تم إرسال الدرجات بنجاح", "success");
          // يمكنك تحديث daysData هنا إذا أردت
        } else {
          showSnackbar(data.message || "فشل إرسال الدرجات", "error");
        }
      } catch (err) {
        console.error(err);
        showSnackbar("حدث خطأ أثناء إرسال الدرجات", "error");
      } finally {
        setLoading(false);
      }
    },
    [token],
  );
  const singleDay = useCallback(
    async (id) => {
      if (!token || !id) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://course-production-c2d8.up.railway.app/api/days/${id}`,
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
          setsingle(data.data.day);
        } else {
          showSnackbar(data.message || "فشل إرسال الدرجات", "error");
        }
      } catch (err) {
        console.error(err);
        showSnackbar("حدث خطأ أثناء إرسال الدرجات", "error");
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  // جلب البيانات بعد اللوجن
  useEffect(() => {
    if (isLoggedIn && token) {
      getDays();
      getUser();
    }
  }, [isLoggedIn, token, getDays, getUser]);

  // حفظ daysData في localStorage
  useEffect(() => {
    localStorage.setItem("daysData", JSON.stringify(daysData));
  }, [daysData]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
    setUser(null);
    setDayes([]);
    setDaysData({}); // أو القيمة الافتراضية
    showSnackbar("تم تسجيل الخروج", "info");
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        formData,
        setFormData,
        loginUser,
        registerUser,
        dayes,
        postDays,
        snackbar,
        setSnackbar,
        user,
        daysData,
        setDaysData,
        loading,
        logout,
        showSnackbar,
        today,
        singleDay,
        single,
        currentDay,
        setCurrentDay,
      }}
    >
      {children}

      {/* Snackbar - يجب أن يكون داخل المزود وليس خارجه */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
}
