import React, { useContext, useMemo } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AuthContext } from "../../context/settingContext";

const ProfilePage = () => {
  const { dayes, user } = useContext(AuthContext);

  // استخراج بيانات الطالب من كل يوم + حساب الإجماليات
  const studentData = useMemo(() => {
    if (!dayes?.days || !user?.phone) return { rows: [], subjects: [], grandTotal: 0 };

    const subjectsSet = new Set();
    let grandTotal = 0;
    const rows = [];

    dayes.days.forEach((day) => {
      const student = day.students?.find((s) => s.studentId === user.phone);
      if (!student) return;

      // جمع أسماء المواد
      Object.keys(student.grades || {}).forEach((sub) => subjectsSet.add(sub));

      const grades = student.grades || {};
      const dailyTotal = Object.values(grades).reduce((sum, val) => sum + (val || 0), 0);

      grandTotal += dailyTotal;

      rows.push({
        date: day.date,
        dayName: day.dayName,
        studentId: student.studentId,
        name: student.name,
        grades,
        dailyTotal,
      });
    });

    const subjects = Array.from(subjectsSet); // تحويل الـ Set إلى Array

    return { rows, subjects, grandTotal };
  }, [dayes, user]);

  const { rows, subjects, grandTotal } = studentData;

  // أول حرف من الاسم للـ Avatar
  const firstLetter = user?.name?.trim()[0]?.toUpperCase() || "؟";

  return (
    <Box sx={{ width: "100%", direction: "rtl" }}>
      <Box component="main" sx={{ px: 1, py: 3, flexGrow: 1 }}>

        {/* Hero Section */}
        <Box
          sx={{
            height: "220px",
            borderRadius: 4,
            mb: 5,
            display: "flex",
            alignItems: "flex-end",
            p: 4,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)",
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 3.5, zIndex: 2 }}>
            <Avatar
              sx={{
                width: 135,
                height: 135,
                bgcolor: "#fff",
                color: "#1a1a1a",
                fontSize: "58px",
                fontWeight: "700",
                border: "6px solid #fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
            >
              {firstLetter}
            </Avatar>

            <Box>
              <Typography variant="h4" fontWeight="700" sx={{ mb: 0.5 }}>
                {user?.name || "الطالب"}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                {user?.phone}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                انضم في{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700}>
                {dayes?.days?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                أيام مسجّلة
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700} color="primary">
                {grandTotal}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                المجموع الكلي
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700}>
                —
              </Typography>
              <Typography variant="body2" color="text.secondary">
                إجمالي الوقت
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* الجدول */}
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>التاريخ</strong></TableCell>
                <TableCell><strong>رقم الطالب</strong></TableCell>
                <TableCell><strong>اسم الطالب</strong></TableCell>

                {subjects.map((subject, i) => (
                  <TableCell key={i} align="center">
                    <strong>{subject}</strong>
                  </TableCell>
                ))}

                <TableCell align="right"><strong>المجموع اليومي</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      {new Date(row.date).toLocaleDateString("ar-EG")}
                    </TableCell>
                    <TableCell>{row.studentId}</TableCell>
                    <TableCell>{row.name}</TableCell>

                    {subjects.map((subject, i) => (
                      <TableCell key={i} align="center">
                        {row.grades[subject] ?? "-"}
                      </TableCell>
                    ))}

                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {row.dailyTotal}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4 + subjects.length} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      لا توجد بيانات درجات مسجلة بعد
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {/* صف المجموع الكلي */}
              {rows.length > 0 && (
                <TableRow sx={{ backgroundColor: "#f5f7fa", fontWeight: "bold" }}>
                  <TableCell colSpan={3} align="right">
                    <strong>المجموع الكلي</strong>
                  </TableCell>
                  {subjects.map((_, i) => (
                    <TableCell key={i} />
                  ))}
                  <TableCell align="right" sx={{ fontSize: "1.2rem", color: "#534AB7" }}>
                    {grandTotal}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProfilePage;