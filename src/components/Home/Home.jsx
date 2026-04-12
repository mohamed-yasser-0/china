import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../context/settingContext";

export default function Home() {
  const { logout, postDays, dayes } = React.useContext(AuthContext);

  const day = dayes.days?.[1];
  console.log(dayes.days);
  const navigate = useNavigate();

  const [currentDay, setCurrentDay] = useState(1);

  // بيانات الأيام (كل يوم يحتوي على array من الطلاب)
  const [daysData, setDaysData] = useState({
    1: [
      {
        date: "2026-04-14",
        students: [
          {
            studentId: "2026001",
            name: "Ahmed",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026002",
            name: "Mohamed",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026003",
            name: "Omar",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026004",
            name: "Youssef",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026005",
            name: "Mahmoud",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026006",
            name: "Hassan",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026007",
            name: "Ali",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026008",
            name: "Khaled",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026009",
            name: "Ibrahim",
            grades: { arabic: null, english: null, bonus: null },
          },
          {
            studentId: "2026010",
            name: "Mostafa",
            grades: { arabic: null, english: null, bonus: null },
          },
        ],
      },
    ],
  });
  console.log(daysData[1][0].date);
  const date = daysData[1][0].date;
  // useEffect(() => {
  //   if (dayes?.days) {
  //     setDaysData({
  //       1: [(day || {})],
  //     });
  //   }
  // }, [dayes]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // الطلاب في اليوم الحالي (مسطح)
  const students = useMemo(() => {
    const dayData = daysData[currentDay] || [];
    return dayData.flatMap((item) => item.students || []);
  }, [daysData, currentDay]);

  // إعداد الصفوف للجدول
  const rows = useMemo(() => {
    return students.map((student) => ({
      ...student,
      total:
        (student.grades?.arabic || 0) +
        (student.grades?.english || 0) +
        (student.grades?.bonus || 0),
    }));
  }, [students]);

  // ==================== دوال التحكم ====================

  const handleDayChange = (newDay) => {
    setCurrentDay(newDay);
  };

  const handleNameChange = (studentId, newName) => {
    setDaysData((prev) => {
      const newData = { ...prev };
      if (newData[currentDay]) {
        newData[currentDay] = newData[currentDay].map((dayItem) => ({
          ...dayItem,
          students: dayItem.students.map((s) =>
            s.studentId === studentId ? { ...s, name: newName } : s,
          ),
        }));
      }
      return newData;
    });
  };

  const handleScoreChange = (studentId, field, value) => {
    setDaysData((prev) => {
      const newData = { ...prev };
      if (newData[currentDay]) {
        newData[currentDay] = newData[currentDay].map((dayItem) => ({
          ...dayItem,
          students: dayItem.students.map((s) =>
            s.studentId === studentId
              ? {
                  ...s,
                  grades: {
                    ...s.grades,
                    [field]: value === "" ? "" : Number(value),
                  },
                }
              : s,
          ),
        }));
      }
      return newData;
    });
  };

  const handleDelete = (studentId) => {
    setDaysData((prev) => {
      const newData = { ...prev };
      if (newData[currentDay]) {
        newData[currentDay] = newData[currentDay].map((dayItem) => ({
          ...dayItem,
          students: dayItem.students.filter((s) => s.studentId !== studentId),
        }));
      }
      return newData;
    });

    setSnackbar({
      open: true,
      message: "تم حذف الطالب بنجاح",
      severity: "success",
    });
  };

  const handleAddStudent = () => {
    const currentStudents = students;
    const maxStudentId = currentStudents.length
      ? Math.max(...currentStudents.map((s) => Number(s.studentId)))
      : 2026000 + currentDay * 100;

    const newStudentId = (maxStudentId + 1).toString();

    setDaysData((prev) => {
      const newData = { ...prev };
      const newStudent = {
        studentId: newStudentId,
        name: "طالب جديد",
        grades: { arabic: "", english: "", bonus: "" },
      };

      if (!newData[currentDay])
        newData[currentDay] = [
          { date: new Date().toISOString().split("T")[0], students: [] },
        ];

      newData[currentDay][0].students.push(newStudent);

      return newData;
    });

    setSnackbar({
      open: true,
      message: "تم إضافة طالب جديد",
      severity: "success",
    });
  };

  const handleLogout = () => {
    if (logout) logout();
    else localStorage.removeItem("token");
    window.location.reload();
  };

  const handleRefresh = () => {
    setSnackbar({
      open: true,
      message: "تم تحديث البيانات",
      severity: "success",
    });
  };

  const exportToExcel = () => {
    const headers = [
      "م",
      "رقم الجلوس",
      "اسم الطالب",
      "درجة العربي",
      "درجة الإنجليزي",
      "البونص",
      "الإجمالي",
    ];

    const csvContent = [
      headers.join(","),
      ...rows.map(
        (row, index) =>
          `${index + 1},${row.studentId},"${row.name}",${row.grades?.arabic || ""},${row.grades?.english || ""},${row.grades?.bonus || ""},${row.total}`,
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `كشف_درجات_يوم_${currentDay}_${new Date().toLocaleDateString("ar-EG")}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setSnackbar({
      open: true,
      message: "تم تحميل الملف بنجاح",
      severity: "success",
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f7fa",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold">
            كشف درجات الطلاب
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="تحديث البيانات">
              <IconButton color="inherit" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="تحميل كـ CSV">
              <IconButton color="inherit" onClick={exportToExcel}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="تسجيل الخروج">
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  "&:hover": { bgcolor: "rgba(255,0,0,0.25)" },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={false}
        sx={{
          flex: 1,
          py: 3,
          px: { xs: 1, sm: 3 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          type="date"
          label="تاريخ اليوم"
          value={daysData[currentDay]?.[0]?.date || ""}
          onChange={(e) =>
            setDaysData((prev) => ({
              ...prev,
              [currentDay]: prev[currentDay].map((dayItem) => ({
                ...dayItem,
                date: e.target.value,
              })),
            }))
          }
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true, // عشان اللابل يفضل فوق دايماً
          }}
          sx={{
            mb: "10px",
            "& .MuiInputBase-input": {
              fontSize: "28px",
              fontWeight: "bold",
              color: "#1976d2",
              textAlign: "center",
              padding: "12px 0",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              "& fieldset": {
                borderColor: "#1976d2",
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: "#1565c0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
                borderWidth: "2.5px",
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "18px",
              fontWeight: "600",
              color: "#1976d2",
            },
          }}
        />

        <Paper
          elevation={4}
          sx={{
            flex: 1,
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* شريط الأيام */}
          <Box
            sx={{
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#f8f9fa",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h6">الأيام:</Typography>

              <Tabs
                value={currentDay}
                onChange={(_, newValue) => handleDayChange(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                {Object.keys(daysData)
                  .sort((a, b) => Number(a) - Number(b))
                  .map((day) => (
                    <Tab key={day} label={`يوم ${day}`} value={Number(day)} />
                  ))}
              </Tabs>

              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                size="small"
                onClick={() => {
                  const newDay =
                    Math.max(...Object.keys(daysData).map(Number)) + 1;
                  setDaysData((prev) => ({
                    ...prev,
                    [newDay]: [
                      {
                        date: new Date().toISOString().split("T")[0],
                        students: [],
                      },
                    ],
                  }));
                  setCurrentDay(newDay);
                }}
              >
                يوم جديد
              </Button>
            </Box>
          </Box>

          {/* شريط الأدوات */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#f8f9fa",
            }}
          >
            <Typography variant="h6">
              يوم {currentDay} - عدد الطلاب: <strong>{students.length}</strong>
            </Typography>

            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => postDays(daysData[1][0])}
              size="large"
            >
              إضافة طالب جديد
            </Button>
          </Box>

          {/* الجدول */}
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <TableContainer sx={{ height: "100%" }}>
              <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", width: 70 }}>
                      م
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", width: 130 }}>
                      رقم الجلوس
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", minWidth: 220 }}>
                      اسم الطالب
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", width: 140 }}
                      align="center"
                    >
                      درجة العربي
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", width: 150 }}
                      align="center"
                    >
                      درجة الإنجليزي
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", width: 120 }}
                      align="center"
                    >
                      البونص
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", width: 130 }}
                      align="center"
                    >
                      الإجمالي
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", width: 100 }}
                      align="center"
                    >
                      حذف
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={row.studentId}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f9fafb" },
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>

                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bold", fontSize: "1.05rem" }}
                      >
                        {row.studentId}
                      </TableCell>

                      <TableCell>
                        <input
                          type="text"
                          value={row.name || ""}
                          onChange={(e) =>
                            handleNameChange(row.studentId, e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            fontSize: "1rem",
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <input
                          type="number"
                          value={row.grades?.arabic ?? ""}
                          onChange={(e) =>
                            handleScoreChange(
                              row.studentId,
                              "arabic",
                              e.target.value,
                            )
                          }
                          min="0"
                          max="100"
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            textAlign: "center",
                            fontSize: "1rem",
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <input
                          type="number"
                          value={row.grades?.english ?? ""}
                          onChange={(e) =>
                            handleScoreChange(
                              row.studentId,
                              "english",
                              e.target.value,
                            )
                          }
                          min="0"
                          max="100"
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            textAlign: "center",
                            fontSize: "1rem",
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <input
                          type="number"
                          value={row.grades?.bonus ?? ""}
                          onChange={(e) =>
                            handleScoreChange(
                              row.studentId,
                              "bonus",
                              e.target.value,
                            )
                          }
                          min="0"
                          max="100"
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            textAlign: "center",
                            fontSize: "1rem",
                          }}
                        />
                      </TableCell>

                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        {row.total}
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(row.studentId)}
                        >
                          حذف
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar */}
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
      </Snackbar>
    </Box>
  );
}
