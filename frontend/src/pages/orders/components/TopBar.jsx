import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from "@mui/material"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"

export default function TopBar() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Typography variant="h5" fontWeight={700} sx={{ color: "#1f2937" }}>
          Easy <span style={{ color: "#ff5722" }}>POS</span>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button sx={{ color: "#6b7280", textTransform: "none", fontWeight: 500 }}>Home</Button>
          <Button sx={{ color: "#6b7280", textTransform: "none", fontWeight: 500 }}>Orders</Button>
          <Button sx={{ color: "#6b7280", textTransform: "none", fontWeight: 500 }}>Customers</Button>
          <Button sx={{ color: "#6b7280", textTransform: "none", fontWeight: 500 }}>Cashier</Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff5722",
              color: "white",
              borderRadius: "24px",
              px: 3,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#f4511e",
                boxShadow: "none",
              },
            }}
          >
            New Order
          </Button>
          <IconButton
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: "50%",
              ml: 1,
            }}
          >
            <NotificationsNoneIcon sx={{ color: "#1f2937" }} />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: "#1f2937",
              width: 40,
              height: 40,
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
