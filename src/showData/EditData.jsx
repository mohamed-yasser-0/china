import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { AuthContext } from "../context/settingContext";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function DaysView() {
  const { daysData, dayes, user, singleDay, single } =
    React.useContext(AuthContext);
  // const [currentDay, setCurrentDay] = useState(1);
  // // الطلاب في اليوم الحالي
  // const students = useMemo(() => {
  //   const dayData = daysData[currentDay] || [];
  //   return dayData.flatMap((item) => item.students || []);
  // }, [daysData, currentDay]);

  const currentDate = daysData[1]?.[0]?.date || "غير محدد";

  const isAdmin = user?.role === "ADMIN";

  // عدد الأيام المتاحة
  const availableDays = Object.keys(daysData).length;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* إخفاء الصفحة لو مش أدمن */}
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
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 3, color: "#1976d2" }}
        >
          عرض درجات الطلاب
        </Typography>

        {/* أزرار اختيار اليوم */}
        <Box
          sx={{
            position: "relative",
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {dayes?.days &&
            dayes.days.map((e, index) => (
              <Button
                variant="contained"
                key={index}
                // variant={currentDay === "index" ? "contained" : "outlined"}
                onClick={() => singleDay(e._id)}
                sx={{
                  ml: 2,
                  px: 4,
                  fontSize: "1.1rem",
                  // fontWeight: currentDay === index ? "bold" : "normal",
                }}
              >
                اليوم {index+1}
              </Button>
            ))}
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              borderRadius: "10px",
              top: "-49px",
              left: "4px",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              background: "linear-gradient(45deg, #2196F3, #21CBF3)",
              "&:hover": {
                background: "linear-gradient(45deg, #1976D2, #00B8D4)",
              },
            }}
          ></Button>
        </Box>

        {/* معلومات اليوم */}

        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Box
            sx={{
              p: 3,
              backgroundColor: "#1976d2",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              اليوم {single?.date}
            </Typography>

            <Typography variant="h6">
              عدد الطلاب: <strong>{single.students?.length}</strong>
            </Typography>
          </Box>
          {/* {single.students?.map((e)=>(
          
        ))} */}
          {/* الجدول */}
          <Box sx={{ overflow: "auto" }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", width: 70 }}
                      align="center"
                    >
                      م
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", width: 130 }}
                      align="center"
                    >
                      رقم الجلوس
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", minWidth: 250 }}>
                      اسم الطالب
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      درجة العربي
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      درجة الإنجليزي
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      البونص
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      الإجمالي
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {single.students?.map((row, index) => (
                    <TableRow
                      key={row.studentId}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f9fafb" },
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        {row.studentId}
                      </TableCell>
                      <TableCell>{row.name || "—"}</TableCell>
                      <TableCell align="center">
                        {row.grades?.arabic ?? "—"}
                      </TableCell>
                      <TableCell align="center">
                        {row.grades?.english ?? "—"}
                      </TableCell>
                      <TableCell align="center">
                        {row.grades?.bonus ?? "—"}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        {(row.grades?.arabic + row.grades?.english + row.grades?.bonus) || "—"}
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
