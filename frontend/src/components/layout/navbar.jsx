import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, Box, Typography, Button, IconButton,
  Avatar, Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, Divider, useMediaQuery,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon       from "@mui/icons-material/Close";
import HomeIcon        from "@mui/icons-material/Home";
import KitchenIcon     from "@mui/icons-material/Kitchen";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MenuBookIcon    from "@mui/icons-material/MenuBook";
import BarChartIcon    from "@mui/icons-material/BarChart";
import { useTheme }    from "@mui/material/styles";

const KitchenMark = ({ size = 34, radius = "10px" }) => (
  <Box sx={{
    width: size, height: size, borderRadius: radius, flexShrink: 0,
    background: "linear-gradient(140deg, #1e293b 0%, #0f172a 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fork tines */}
      <rect x="4" y="2" width="1.2" height="7" rx="0.6" fill="#f97316"/>
      <rect x="6.2" y="2" width="1.2" height="7" rx="0.6" fill="#f97316"/>
      <rect x="8.4" y="2" width="1.2" height="7" rx="0.6" fill="#f97316"/>
      {/* Fork neck */}
      <rect x="5.5" y="9" width="2.6" height="1.2" rx="0.6" fill="#f97316"/>
      {/* Fork handle */}
      <rect x="5.9" y="10" width="1.8" height="9" rx="0.9" fill="#f97316"/>
      {/* Knife blade */}
      <path d="M13 2 C13 2 16 5 16 10 L16 11 L13 11 Z" fill="#fbbf24"/>
      {/* Knife handle */}
      <rect x="13" y="11" width="3" height="9" rx="1.5" fill="#f97316"/>
    </svg>
  </Box>
);

const Navbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);

  const links = useMemo(() => [
    { label: "POS",         path: "/",                icon: <HomeIcon        fontSize="small" /> },
    { label: "Kitchen",     path: "/kitchen",         icon: <KitchenIcon     fontSize="small" /> },
    { label: "Paid Orders", path: "/paid-orders",     icon: <ReceiptLongIcon fontSize="small" /> },
    { label: "Menu",        path: "/menu-dashboard",  icon: <MenuBookIcon    fontSize="small" /> },
    { label: "Analytics",   path: "/admin-analytics", icon: <BarChartIcon    fontSize="small" /> },
  ], []);

  const visible = links;
  const active  = (path) => location.pathname === path;

  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            minHeight: { xs: 60, md: 64 },
            px: { xs: 2, md: 4 },
            gap: 2,
          }}
        >
          {/* ── Logo ────────────────────────────── */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              userSelect: "none",
              flexShrink: 0,
              mr: { md: 2 },
            }}
          >
            {/* Kitchen icon mark */}
            <KitchenMark size={34} radius="10px" />

            {/* Wordmark */}
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#0d1117",
                lineHeight: 1,
              }}
            >
              easy
              <Box component="span" sx={{ color: "secondary.main" }}>pos</Box>
            </Typography>
          </Box>

          {/* ── Pill Nav — desktop ───────────────── */}
          {!isMobile && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  borderRadius: "999px",
                  p: "4px",
                }}
              >
                {visible.map((link) => {
                  const on = active(link.path);
                  return (
                    <Button
                      key={link.label}
                      onClick={() => navigate(link.path)}
                      disableRipple={on}
                      sx={{
                        px: { md: 1.8, lg: 2.4 },
                        py: 0.75,
                        minWidth: 0,
                        borderRadius: "999px",
                        fontSize: 13.5,
                        fontWeight: on ? 600 : 500,
                        color:    on ? "#0d1117" : "#6b7280",
                        bgcolor:  on ? "#ffffff" : "transparent",
                        boxShadow: on ? "0 1px 4px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)" : "none",
                        transition: "all 0.16s ease",
                        "&:hover": {
                          bgcolor: on ? "#ffffff" : "rgba(0,0,0,0.04)",
                          color:   "#0d1117",
                          boxShadow: on ? "0 1px 4px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)" : "none",
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          )}

          {/* Spacer for mobile */}
          {isMobile && <Box sx={{ flex: 1 }} />}

          {/* ── Right controls ───────────────────── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
            {/* Live indicator */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <span className="live-dot">
                <span className="live-dot-inner" />
              </span>
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ color: "#6b7280", fontSize: 12 }}
              >
                Live
              </Typography>
            </Box>

           

            {/* Hamburger — mobile */}
            {isMobile && (
              <IconButton
                size="small"
                onClick={() => setOpen(true)}
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: "10px",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                }}
              >
                <MenuRoundedIcon fontSize="small" sx={{ color: "#0d1117" }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Mobile Drawer ────────────────────── */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 270,
            borderRadius: "18px 0 0 18px",
            p: 0,
            border: "none",
            boxShadow: "-8px 0 40px rgba(0,0,0,0.1)",
          },
        }}
      >
        {/* Drawer header */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          pt: 2.5,
          pb: 2,
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <KitchenMark size={30} radius="9px" />
            <Typography sx={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              easy<Box component="span" sx={{ color: "secondary.main" }}>pos</Box>
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setOpen(false)}
            sx={{ bgcolor: "rgba(0,0,0,0.04)", borderRadius: "8px", width: 30, height: 30 }}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ px: 1.5, pt: 1.5, pb: 2 }}>
          {visible.map((link) => {
            const on = active(link.path);
            return (
              <ListItemButton
                key={link.label}
                onClick={() => { navigate(link.path); setOpen(false); }}
                sx={{
                  borderRadius: "10px",
                  mb: 0.5,
                  py: 1.1,
                  px: 1.5,
                  bgcolor: on ? "rgba(249,115,22,0.08)" : "transparent",
                  "&:hover": { bgcolor: on ? "rgba(249,115,22,0.1)" : "rgba(0,0,0,0.04)" },
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 34,
                  color: on ? "secondary.main" : "text.secondary",
                }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: on ? 700 : 500,
                    color: on ? "secondary.main" : "text.primary",
                  }}
                />
                {on && (
                  <Box sx={{
                    width: 6, height: 6, borderRadius: "50%",
                    bgcolor: "secondary.main", flexShrink: 0,
                  }} />
                )}
              </ListItemButton>
            );
          })}
        </List>

        {/* Bottom user row */}
        <Box sx={{
          mx: 2, mb: 2.5, mt: "auto",
          p: 1.5,
          borderRadius: "12px",
          bgcolor: "rgba(0,0,0,0.03)",
          border: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}>
          <Avatar sx={{ width: 32, height: 32, fontSize: 13, fontWeight: 700, bgcolor: "#0f172a" }}>A</Avatar>
          <Box>
            <Typography variant="body2" fontWeight={700} fontSize={13}>Admin</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <span className="live-dot" style={{ width: 10, height: 10 }}>
                <span className="live-dot-inner" style={{ width: 6, height: 6 }} />
              </span>
              <Typography variant="caption" color="text.secondary" fontSize={11}>Online</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
