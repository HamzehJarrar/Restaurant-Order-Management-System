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

const Navbar = () => {
    const navigate = useNavigate();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Kitchen", path: "/kitchen" },
        { name: "Paid Orders", path: "/paid-orders" },
    ];

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "white",
                boxShadow: "none",
                padding: "0 10px",
                border : "1px solid #E5E7EB",
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
                    {navLinks.map((link) => (
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

                    {/* New Order Button */}
                    <Button
                        variant="contained"
                        onClick={() => navigate("/new-order")}
                        sx={{
                            backgroundColor: "#FF5722",
                            color: "white",
                            borderRadius: "50px",
                            textTransform: "none",
                            padding: "8px 24px",
                            fontSize: "15px",
                            fontWeight: "bold",
                            boxShadow: "none",
                            "&:hover": { backgroundColor: "#E64A19", boxShadow: "none" }
                        }}
                    >
                        New Order
                    </Button>

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