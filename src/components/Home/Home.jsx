import React, { useMemo, useEffect } from "react";
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import { AuthContext } from "../../context/settingContext";
import ProfilePage from "../Profile/Page";
import AlertDialog from "../bobab/Dialog";

export default function Home() {
  const { daysData, setDaysData, user, currentDay } =
    React.useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("daysData", JSON.stringify(daysData));
  }, [daysData]);

  // const dates = daysData[1][0]?.date;
  // useEffect(() => {
  //   if (dayes?.days) {
  //     setDaysData({
  //       1: [(day || {})],
  //     });
  //   }
  // }, [dayes]);

  // الطلاب في اليوم الحالي (مسطح)
  const students = useMemo(() => {
    const dayData = daysData?.[currentDay];
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

  // const handleNameChange = (studentId, newName) => {
  //   setDaysData((prev) => {
  //     const newData = { ...prev };
  //     if (newData[currentDay]) {
  //       newData[currentDay] = newData[currentDay].map((dayItem) => ({
  //         ...dayItem,
  //         students: dayItem.students.map((s) =>
  //           s.studentId === studentId ? { ...s, name: newName } : s,
  //         ),
  //       }));
  //     }
  //     return newData;
  //   });
  // };

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
  const isAdmin = user?.role === "ADMIN";
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#f5f7fa",
        overflow: "hidden",
      }}
    >
      {isAdmin ? "" : <ProfilePage />}
      <Container
        maxWidth={false}
        sx={{
          display: isAdmin ? "flex" : "none",
          flex: 1,
          py: 3,
          px: { xs: 1, sm: 3 },
          flexDirection: "column",
        }}
      >
        {/* {console.log(daysData[currentDay]?.[0])} */}
        <TextField
          type="date"
          label="تاريخ اليوم"
          value={daysData[currentDay]?.[0]?.date}
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
            shrink: true,
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
              عدد الطلاب: <strong>{students.length}</strong>
            </Typography>

            <AlertDialog />
          </Box>

          {/* الجدول */}
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <TableContainer sx={{ height: "100%" }}>
              <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        width: 70,
                      }}
                    >
                      رقم
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        width: 130,
                      }}
                    >
                      رقم الجلوس
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        width: 130,
                      }}
                    >
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
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bold", fontSize: "1.05rem" }}
                      >
                        {row.name}
                      </TableCell>

                      {/* <TableCell>
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
                      </TableCell> */}

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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
