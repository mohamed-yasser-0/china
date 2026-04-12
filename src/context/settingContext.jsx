/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.js
import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  //   const [user, setUser] = useState(null);
  const [dayes, setDayes] = useState([]);
  //   const [lessons, setLessons] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [tab, setTab] = useState("logIn");

  const [formData, setFormData] = useState({
    name: "mohamed",
    phone: "012",
    password: "12345678",
    role: "ADMIN",
  });

  // ====================== API Functions ======================

  const loginUser = useCallback(async () => {
    try {
      const response = await fetch(
        `https://course-production-c2d8.up.railway.app/api/users/${tab}`,
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
        if (tab === "logIn") {
          const newToken = data.data.token;
          localStorage.setItem("token", newToken);
          setToken(newToken);
          setIsLoggedIn(true);
        } else {
          alert("تم التسجيل بنجاح! يرجى تسجيل الدخول");
          setTab("logIn");
          // setFormData({ ...formData, password: "" });
        }
      } else {
        alert(data.message || "فشلت العملية");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
  }, [tab, formData]);
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
        // alert("sucess");
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
      // getUser();
    }, 0);

    return () => clearTimeout(timer);
  }, [isLoggedIn, token, getDays]);
  return (
    <AuthContext.Provider
      value={{
        token,
        // user,
        // courses,
        // lessons,
        isLoggedIn,
        tab,
        setTab,
        formData,
        setFormData,
        loginUser,
        dayes,
        postDays,
        // fetchCourses,
        // postCourses,
        // deleteCourse,
        // postLessons,
        // getLessons,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
