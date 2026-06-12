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
            {/* Icon mark */}
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "10px",
                background: "linear-gradient(140deg, #1e293b 0%, #0f172a 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "3px",
                  background: "linear-gradient(135deg, #f97316, #fbbf24)",
                }}
              />
            </Box>

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
              <Box
                component="span"
                sx={{ color: "secondary.main" }}
              >
                pos
              </Box>
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
            <Box sx={{
              width: 30, height: 30, borderRadius: "9px",
              background: "linear-gradient(140deg, #1e293b, #0f172a)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "2px", background: "linear-gradient(135deg, #f97316, #fbbf24)" }} />
            </Box>
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
