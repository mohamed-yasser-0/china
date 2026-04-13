import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Container,
  Paper,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  Chip,
} from "@mui/material";
import { AuthContext } from "../../context/settingContext";

const ProfilePage = () => {
  const { dayes, user } = useContext(AuthContext);
  // useEffect(() => {
  //   if (dayes?.days) {
  //     console.log("dayes data:", dayes.days);
  //   }
  // }, [dayes]);
  console.log("user", user.phone);
  // بيانات المستخدم (ثابتة)
  // const user = {
  //   name: "أحمد محمد",
  //   title: "مطور React | طالب برمجة شغوف",
  //   avatar: "https://via.placeholder.com/180",
  //   location: "الإسكندرية، مصر",
  //   joined: "مارس 2024",
  // };

  // حساب المجموع الكلي مرة واحدة خارج الـ render (أفضل أداء)
  const grandTotal = React.useMemo(() => {
    let total = 0;
    dayes?.days?.forEach((day) => {
      day.students
        ?.filter((x) => x.studentId === user.phone)
        .forEach((x) => {
          const dailySum = Object.values(x?.grades || {}).reduce(
            (sum, val) => sum + (val || 0),
            0,
          );
          total += dailySum;
        });
    });
    return total;
  }, [dayes]);

  // استخراج أسماء المواد من أول يوم (لعناوين الأعمدة)
  const subjects = React.useMemo(() => {
    const firstStudent = dayes?.days?.[0]?.students?.find(
      (s) => s.studentId === user.phone,
    );
    return firstStudent ? Object.keys(firstStudent.grades || {}) : [];
  }, [dayes]);

  return (
    <Box sx={{ width: "100%", direction: "rtl" }}>
      <Box component="main" sx={{ px: 1, py: 3, flexGrow: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            height: "220px", // ارتفاع أقل وأنظف
            borderRadius: 4,
            mb: 5,
            display: "flex",
            alignItems: "flex-end",
            p: 4,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          }}
        >
          {/* خلفية خفيفة للعمق */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)",
            }}
          />

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 3.5, zIndex: 2 }}
          >
            {/* Avatar بحرف أول فقط - أبيض وأسود */}
            <Avatar
              sx={{
                width: 135,
                height: 135,
                bgcolor: "#ffffff", // خلفية بيضاء
                color: "#1a1a1a", // حرف أسود
                fontSize: "52px",
                fontWeight: "700",
                border: "6px solid #ffffff",
                boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              أ
            </Avatar>

            <Box>
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{ mb: 0.8, letterSpacing: "-0.5px" }}
              >
                {user.name}
              </Typography>

              <Typography variant="h6" sx={{ opacity: 0.85, mb: 1.2 }}>
                {user.phone}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {`انضم في ${new Date(user.createdAt).toLocaleDateString("ar-EG")}`}{" "}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          {/* Summary Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  {dayes?.days?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  أيام مسجّلة
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  {grandTotal}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  المجموع الكلي
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  —{/* لو عندك إجمالي وقت أضفه هنا */}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  إجمالي الوقت
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* الجدول الرئيسي */}
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: 3 }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>اليوم</strong>
                  </TableCell>
                  <TableCell>
                    <strong>رقم الطالب</strong>
                  </TableCell>
                  <TableCell>
                    <strong>اسم الطالب</strong>
                  </TableCell>

                  {/* أسماء المواد ديناميكي */}
                  {subjects.map((subject, idx) => (
                    <TableCell key={idx}>
                      <strong>{subject}</strong>
                    </TableCell>
                  ))}

                  <TableCell align="right">
                    <strong>المجموع اليومي</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dayes?.days?.map((day, dayIndex) =>
                  day.students
                    .filter((x) => x.studentId === user.phone)
                    .map((x, i) => {
                      const dailyTotal = Object.values(x?.grades || {}).reduce(
                        (sum, val) => sum + (val || 0),
                        0,
                      );
                      console.log("day", day.date);
                      return (
                        <TableRow key={x._id || `${dayIndex}-${i}`} hover>
                          {/* <TableCell>
                            {day.dayName || `يوم ${dayIndex + 1}`}
                          </TableCell> */}
                          <TableCell>
                            {day.date?.split("-").reverse().join("-")}
                          </TableCell>
                          <TableCell>{x.studentId}</TableCell>
                          <TableCell>{x.name}</TableCell>

                          {Object.entries(x?.grades || {}).map(
                            ([key, value], idx) => (
                              <TableCell key={idx}>{value ?? "-"}</TableCell>
                            ),
                          )}

                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {dailyTotal}
                          </TableCell>
                        </TableRow>
                      );
                    }),
                )}

                {/* صف المجموع الكلي النهائي */}
                <TableRow
                  sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}
                >
                  <TableCell colSpan={3} align="right">
                    <strong>المجموع الكلي لكل الأيام</strong>
                  </TableCell>

                  {/* خلايا فارغة بعدد المواد */}
                  {subjects.map((_, idx) => (
                    <TableCell key={idx} />
                  ))}

                  <TableCell
                    align="right"
                    sx={{ fontSize: "1.15rem", color: "#534AB7" }}
                  >
                    {grandTotal}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
