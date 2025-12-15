import { Box, IconButton, Typography } from "@mui/material"
import LocalCafeIcon from "@mui/icons-material/LocalCafe"
import LocalBarIcon from "@mui/icons-material/LocalBar"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import BakeryDiningIcon from "@mui/icons-material/BakeryDining"
import TableBarIcon from "@mui/icons-material/TableBar"

export default function SideBar() {
  const categories = [
    { icon: <LocalCafeIcon />, label: "Coffee", active: true },
    { icon: <LocalBarIcon />, label: "Beverages", active: false },
    { icon: <FastfoodIcon />, label: "Food", active: false },
    { icon: <RestaurantIcon />, label: "Appetizer", active: false },
    { icon: <BakeryDiningIcon />, label: "Bakeries", active: false },
    { icon: <TableBarIcon />, label: "Table", active: false },
  ]

  return (
    <Box
      sx={{
        width: 110,
        bgcolor: "white",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 3,
        gap: 2,
      }}
    >
      {categories.map((cat, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <IconButton
            sx={{
              bgcolor: cat.active ? "#10b981" : "#f9fafb",
              color: cat.active ? "white" : "#9ca3af",
              borderRadius: "16px",
              width: 64,
              height: 64,
              "&:hover": {
                bgcolor: cat.active ? "#059669" : "#f3f4f6",
              },
            }}
          >
            {cat.icon}
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              color: cat.active ? "#1f2937" : "#9ca3af",
              fontSize: "0.75rem",
              fontWeight: cat.active ? 600 : 500,
            }}
          >
            {cat.label}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
