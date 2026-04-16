import React from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { AuthContext } from "../../context/settingContext";
import { useContext } from "react";

// استيراد المكتبات الجديدة
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link, useNavigate } from "react-router-dom";

export default function Bar() {
  const { logout, setSnackbar, user, dayes } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    else localStorage.removeItem("token");
    window.location.reload();
  };

  const handleRefresh = () => {
    localStorage.removeItem("daysData");
    window.location.reload();
    setSnackbar({
      open: true,
      message: "تم تحديث البيانات",
      severity: "success",
    });
  };

  // ============== دالة التصدير إلى Excel ==============
  const exportToExcel = () => {
    const storedData = localStorage.getItem("daysData");

    if (!storedData) {
      alert("لا يوجد بيانات للتصدير");
      return;
    }

    const parsedData = JSON.parse(storedData);

    let exportData = [];
    let counter = 1;

    Object.keys(parsedData).forEach((dayKey) => {
      parsedData[dayKey].forEach((day) => {
        day.students.forEach((student) => {
          const arabic = student.grades.arabic || 0;
          const english = student.grades.english || 0;
          const bonus = student.grades.bonus || 0;
          const total = arabic + english + bonus;

          exportData.push({
            م: counter++,
            "رقم الجلوس": student.studentId,
            "اسم الطالب": student.name,
            تاريخ: day.date,
            "درجة العربي": arabic,
            "درجة الإنجليزي": english,
            البونص: bonus,
            الإجمالي: total,
          });
        });
      });
    });

    // إنشاء ملف Excel
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "كشف الدرجات");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(dataBlob, "كشف_درجات_الطلاب.xlsx");

    setSnackbar({
      open: true,
      message: "تم تحميل الملف بنجاح",
      severity: "success",
    });
  };

  // console.log(dayes?.days)
  return (
    <AppBar
      position="fixed"
      sx={{
        mb: "10",
        bgcolor: "#1976d2",
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        width: "100%",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight="bold">
          {user?.role === "ADMIN" ? "درجات الطلاب" : `مرحبأ ${user?.name}`}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip
            sx={{ display: user?.role === "ADMIN" ? "flex" : "none" }}
            title="سجل الايام"
          >
            <IconButton
              component={Link}
              to={`/daysview`}
              color="inherit"
            >
              <RestorePageIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            sx={{ display: user?.role === "ADMIN" ? "flex" : "none" }}
            title="تحديث البيانات"
          >
            <IconButton color="inherit" onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            sx={{ display: user?.role === "ADMIN" ? "flex" : "none" }}
            title="تحميل كـ Excel"
          >
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
  );
}
