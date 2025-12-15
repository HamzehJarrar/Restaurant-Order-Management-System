import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function AppLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f4f6" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Button color="inherit" component={Link} to="/menu">Menu</Button>
          <Button color="inherit" component={Link} to="/orders">Orders</Button>
          <Button color="inherit" component={Link} to="/kitchen">Kitchen</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
