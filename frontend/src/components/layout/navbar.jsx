import React from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Avatar
} from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { use } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Kitchen", path: "/kitchen" },
        { name: "Paid Orders", path: "/paid-orders" },

        { name: "Menu Dashboard", path: "/menu-dashboard" , adminOnly: true},
        { name: "Analytics", path: "/admin-analytics" , adminOnly: true},
    ];

    const filteredNavLinks = navLinks.filter(link =>{
        if(link.adminOnly && role !== "admin"){
            return false;
        }
        return true;
    })

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "white",
                boxShadow: "none",
                padding: "0 10px",
                border: "1px solid #E5E7EB",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: "80px" }}>

                {/* 1. Logo Section */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "#1a1a1a" }}>
                        Easy <span style={{ color: "#FF5722" }}>POS</span>
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>

                    {/* Text Links */}
                    {filteredNavLinks.map((link) => (
                        <Button
                            key={link.name}
                            onClick={() => navigate(link.path)}
                            sx={{
                                textTransform: "none",
                                color: "#757575",
                                fontSize: "16px",
                                fontWeight: 500,
                                "&:hover": { backgroundColor: "transparent", color: "#000" }
                            }}
                        >
                            {link.name}
                        </Button>
                    ))}

                    {/* Notification Icon */}
                    <IconButton
                        sx={{
                            border: "1px solid #e0e0e0",
                            width: "45px",
                            height: "45px"
                        }}
                    >
                        <NotificationsNoneIcon sx={{ color: "#1a1a1a" }} />
                    </IconButton>

                    {/* User Avatar */}
                    <Avatar sx={{ bgcolor: "#1a1a1a", width: 45, height: 45, fontSize: "18px" }}>
                        A
                    </Avatar>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;