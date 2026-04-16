import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  Stack,
} from "@mui/material";
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  Language as LanguageIcon,
  EmojiEvents as TrophyIcon,
  Group as GroupIcon,
  PlayCircle as PlayIcon,
  Close as CloseIcon,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FlakyIcon from "@mui/icons-material/Flaky";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ListItemButton } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import Login from "../log/logIn";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeContext } from "../../theme/theme";
import SunnyIcon from "@mui/icons-material/Sunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
const WelcomePage = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const menuItems = [
    { label: "الرئيسية", id: "#hero" },
    { label: "لماذا الصينية", id: "#why" },
    { label: "آراء الطلاب", id: "#students" },
    { label: "اتصل بنا", id: "#connect" },
  ];
  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 60, color: "#d32f2f" }} />,
      title: "دروس تفاعلية 100%",
      desc: "تعلم من خلال تمارين صوتية وفيديوهات حية مع مدربين صينيين أصليين",
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 60, color: "#d32f2f" }} />,
      title: "ماندارين + هانزي",
      desc: "من الصفر لحد HSK 6 – نطق، كتابة، محادثة، وقراءة",
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 60, color: "#d32f2f" }} />,
      title: "شهادة معتمدة",
      desc: "احصل على شهادة HSK رسمية معتمدة دولياً عند إنهاء الكورس",
    },
    {
      icon: <GroupIcon sx={{ fontSize: 60, color: "#d32f2f" }} />,
      title: "مجتمع طلابي",
      desc: "انضم لجروب واتساب وديسكورد مع +5000 طالب عربي",
    },
  ];

  const testimonials = [
    {
      name: "أحمد الشريف",
      role: "مهندس برمجيات - القاهرة",
      text: "خلال 3 شهور بس قدرت أتكلم ماندارين بطلاقة وأقدر أقرأ الصحف الصينية. الكورس ده غير حياتي!",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "سارة محمد",
      role: "مديرة تسويق - الإسكندرية",
      text: "أفضل كورس صيني شفته في حياتي. الطريقة حديثة وممتعة والمدربين صينيين حقيقيين.",
      avatar: "",
    },
  ];
  const { theme, toggleTheme, colors, setTheme } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <Box
      sx={{
        direction: "rtl",
        minHeight: "100vh",
        bgcolor: colors.background,
      }}
    >
      {/* Navbar */}
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(211, 47, 47, 0.15)",
          backdropFilter: "blur(12px)",
          bgcolor: colors.background,
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo - أكبر وأكثر فخامة */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: "#d32f2f",
                  borderRadius: "50%",
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "2.1rem",
                  boxShadow: "0 6px 16px rgba(211, 47, 47, 0.25)",
                }}
              ></Box>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  color: colors.text,
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={800}
                  color="primary"
                  sx={{
                    lineHeight: 1,
                    letterSpacing: -0.5,
                    fontSize: "30px",
                  }}
                >
                  كورس الصينية
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ display: "block" }}
                >
                  ماندارين • HSK • 2026
                </Typography>
              </Box>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 4 }}>
                {menuItems.map((e, index) => (
                  <Button
                    key={index}
                    href={e.id}
                    underline="none"
                    sx={{
                      fontSize: 22,
                      transition: "all 0.3s",
                      "&:hover": {
                        color: "#EE1D52",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {e.label}
                  </Button>
                ))}
              </Box>
            )}
            {/* Right Side - زرارين + موبايل */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: { xs: "100%", md: "fit-content" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              {/* تسجيل الدخول - outlined */}

              {/* ابدأ مجاناً - contained + أيقونة */}
              <Stack
                sx={{
                  display: "flex,",
                  flexDirection: { xs: "row", md: "row-reverse" },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  //   startIcon={<PlayCircle />}
                  component={Link}
                  to="/logIn"
                  sx={{
                    px: 4.5,
                    py: 1.4,
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    borderRadius: 50,
                  }}
                >
                  تسجيل الدخول
                </Button>
                <IconButton
                  onClick={() => toggleTheme()}
                  sx={{
                    color: colors.text,
                  }}
                >
                  <SunnyIcon />
                </IconButton>
              </Stack>

              {/* Mobile Hamburger */}
              {isMobile && (
                <IconButton
                  onClick={handleDrawerToggle}
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <MenuIcon sx={{ color: colors.text }} fontSize="large" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {/* Mobile Drawer - محسن وحديث جداً */}
      <Drawer
        anchor="top" // ← غيرته لـ right عشان يكون أكثر احترافية (ستاندرد في الموبايل)
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 320 }, // full width على الموبايل الصغير
            bgcolor: "#fffaf0", // نفس لون الخلفية الرئيسية
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            direction: "rtl",
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header داخل الـ Drawer */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: 3,
              borderBottom: "2px solid #f57c00",
            }}
          >
            {/* Logo داخل الدراور */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#d32f2f",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.9rem",
                }}
              ></Box>
            </Box>

            {/* زرار الإغلاق */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "#d32f2f",
                "&:hover": { bgcolor: "rgba(211, 47, 47, 0.1)" },
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* القائمة الرئيسية */}
          <List sx={{ flexGrow: 1, px: 1 }}>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  href={item.id}
                  onClick={() => {
                    handleDrawerToggle();
                  }}
                  sx={{
                    textAlign: "center",
                    borderBottom: "1px solid",
                    borderRadius: 1,
                    px: 3,
                    color: "#1a1a1a",
                    "&:hover": {
                      bgcolor: "#fff1e0",
                      color: "#f57c00",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Hero Section - Modern & Eye-catching */}
      <Box
        id="hero"
        sx={{
          height: "100vh",
          minHeight: "700px",
          background:
            'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url("https://picsum.photos/id/1015/2000/1200") center/cover no-repeat',
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 7 }} sx={{ color: "#fff" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "4rem" },
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                اتقن اللغة الصينية
                <br />
                <Box component="span" sx={{ color: "#f57c00" }}>
                  بأسهل طريقة في 2026
                </Box>
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  maxWidth: 600,
                  opacity: 0.95,
                  fontSize: { xs: "2rem", md: "2rem" },
                }}
              >
                +5000 طالب عربي اتعلموا ماندارين معانا • دروس حية • تطبيق مخصص •
                شهادة HSK
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  width: "250px",
                  flexWrap: "wrap",
                  gap: 4,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 3,
                    fontSize: { xs: "1.2rem", md: "1.7rem" },
                  }}
                >
                  سجل دلوقتي مجاناً
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 3,
                    fontSize: { xs: "1.2rem", md: "1.7rem" },
                    color: "white",
                    borderColor: "white",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  شاهد فيديو 60 ثانية
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 6,
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "#f57c00", mr: 1, ml: 2 }}>
                    <FlakyIcon />
                  </Avatar>
                  <Typography color="white">مدربين صينيين أصليين</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "#f57c00", mr: 1, ml: 2 }}>
                    <StarBorderIcon />
                  </Avatar>
                  <Typography color="white">4.98/5 تقييم الطلاب</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "bounce 2s infinite",
          }}
        >
          <Typography variant="caption" sx={{ mb: 1 }}>
            اسحب للأسفل
          </Typography>
          <Box sx={{ width: 2, height: 60, bgcolor: "white", opacity: 0.5 }} />
        </Box>
      </Box>

      {/* Features Section */}
      <Container id="why" maxWidth="xl" sx={{ py: 12, color: colors.text }}>
        <Typography variant="h2" gutterBottom>
          ليه تختار كورس الصينية؟
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: 700, mx: "auto" }}
        >
          كل حاجة محتاجها عشان تتكلم وتكتب وتفهم الصينية في وقت قياسي
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 5 }}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box id="students" sx={{ bgcolor: "#eee", py: 10 }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{ color: colors.background }}
            gutterBottom
          >
            اللي قالوا عن الكورس
          </Typography>
          <Grid container spacing={6} sx={{ mt: 4 }}>
            {testimonials.map((t, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <Card sx={{ height: "100%", p: 4 }}>
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Avatar src={t.avatar} sx={{ width: 64, height: 64 }} />
                    <Box>
                      <Typography variant="h6">{t.name}</Typography>
                      <Typography>{t.role}</Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.7,
                      fontStyle: "italic",
                    }}
                  >
                    “{t.text}”
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        id="connect"
        sx={{
          py: 12,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 3 }}>
            جاهز تبدأ رحلتك الصينية؟
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, opacity: 0.9 }}>
            أول 100 طالب يسجلوا النهاردة هياخدوا الشهر الأول مجاناً + كتاب هانزي
            هدية
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 10,
              py: 3,
              fontSize: "1.5rem",
              bgcolor: "#fff",
              color: "#d32f2f",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            سجل دلوقتي وابدأ مجاناً
          </Button>
          <Typography variant="body2" sx={{ mt: 4, opacity: 0.8 }}>
            لا بطاقة ائتمان مطلوبة • يمكنك الإلغاء في أي وقت
          </Typography>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: colors.background, color: colors.text, py: 5 }}>
        <Container maxWidth="xl">
          <Grid container spacing={8}>
            {/* Column 1: Logo + وصف */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    bgcolor: "#d32f2f",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                  }}
                >
                  🇨🇳
                </Box>
              </Box>
              <Typography
                color="grey.400"
                sx={{ maxWidth: 320, lineHeight: 1.8, fontSize: "1.05rem" }}
              >
                أقوى منصة عربية لتعلم الماندارين بطريقة حديثة وممتعة
              </Typography>
            </Grid>

            {/* Column 2: الدورات */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
                sx={{ mb: 3 }}
              >
                الدورات
              </Typography>
              <List dense sx={{ p: 0 }}>
                <ListItem disablePadding sx={{ mb: 1.5 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    sx={{
                      fontSize: "1.05rem",
                      "&:hover": { color: "#f57c00" },
                    }}
                  >
                    ماندارين للمبتدئين (HSK 1-2)
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1.5 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    sx={{
                      fontSize: "1.05rem",
                      "&:hover": { color: "#f57c00" },
                    }}
                  >
                    كورس المتوسط (HSK 3-4)
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1.5 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    sx={{
                      fontSize: "1.05rem",
                      "&:hover": { color: "#f57c00" },
                    }}
                  >
                    المتقدم (HSK 5-6)
                  </Link>
                </ListItem>
              </List>
            </Grid>
            {/* Column 3: موارد ومساعدة */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
                sx={{ mb: 3 }}
              >
                موارد
              </Typography>
              <List dense sx={{ p: 0 }}>
                <ListItem disablePadding sx={{ mb: 1.5 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    sx={{
                      fontSize: "1.05rem",
                      "&:hover": { color: "#f57c00" },
                    }}
                  >
                    اختبارات HSK مجانية
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1.5 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    sx={{
                      fontSize: "1.05rem",
                      "&:hover": { color: "#f57c00" },
                    }}
                  >
                    المدونة
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    sx={{
                      fontSize: "1.05rem",
                      "&:hover": { color: "#f57c00" },
                    }}
                  >
                    اتصل بنا
                  </Link>
                </ListItem>
              </List>
            </Grid>

            {/* Column 4: تابعنا + أيقونات */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
                sx={{ mb: 3 }}
              >
                تابعنا
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* TikTok */}
                <IconButton
                  component="a"
                  href="https://www.tiktok.com/@coursalsiniah"
                  target="_blank"
                  color="inherit"
                  sx={{
                    fontSize: 32,
                    transition: "all 0.3s",
                    "&:hover": {
                      color: "#EE1D52",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <WhatsAppIcon fontSize="large" />
                </IconButton>

                {/* Instagram */}
                <IconButton
                  component="a"
                  href="https://www.instagram.com/coursalsiniah"
                  target="_blank"
                  color="inherit"
                  sx={{
                    transition: "all 0.3s",
                    "&:hover": {
                      color: "#E1306C",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <Instagram sx={{ fontSize: 32 }} />
                </IconButton>

                {/* YouTube */}
                <IconButton
                  component="a"
                  href="https://www.youtube.com/@coursalsiniah"
                  target="_blank"
                  color="inherit"
                  sx={{
                    transition: "all 0.3s",
                    "&:hover": {
                      color: "#FF0000",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <YouTube sx={{ fontSize: 36 }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Divider + Bottom Bar */}
        <Divider sx={{ bgcolor: colors.text, my: 5 }} />
        <Container maxWidth="xl">
          <Box
            sx={{
              color: colors.text,
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography variant="body2">
              © 2026 كورس الصينية - كل الحقوق محفوظة
            </Typography>

            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <Link href="#" underline="hover" sx={{ fontSize: "0.95rem" }}>
                سياسة الخصوصية
              </Link>
              <Link href="#" underline="hover" sx={{ fontSize: "0.95rem" }}>
                الشروط والأحكام
              </Link>
              <Link href="#" underline="hover" sx={{ fontSize: "0.95rem" }}>
                خريطة الموقع
              </Link>
            </Box>

            <Typography variant="body2">مصمم خصيصاً للطلاب العرب 🇪🇬</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomePage;
