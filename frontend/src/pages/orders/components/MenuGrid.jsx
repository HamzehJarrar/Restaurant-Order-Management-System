import { Box, Chip } from "@mui/material"
import MenuCard from "./MenuCard"

const categories = ["All", "Ice Coffee", "American", "Café Noir", "Brewed Coffee", "Iced Coffee", "Flavored Coffee"]

const menuItems = [
  { id: 101, name: "Cortado", price: 8.5, image: "/cortado-coffee-latte-art.jpg" },
  { id: 102, name: "Frappé Mocha", price: 8.5, image: "/frappe-mocha-coffee.jpg" },
  { id: 103, name: "Cappuccino", price: 8.5, image: "/cappuccino-coffee-cup.png" },
  { id: 104, name: "Mocha Cortado", price: 8.5, image: "/mocha-cortado-coffee.jpg" },
  { id: 105, name: "Americano", price: 8.5, image: "/americano-coffee-white-cup.jpg" },
  { id: 106, name: "Flat White", price: 8.5, image: "/flat-white-coffee-latte-art.jpg" },
  { id: 107, name: "Mocha", price: 8.5, image: "/mocha-coffee-chocolate.jpg" },
  { id: 108, name: "Flat Black", price: 8.5, image: "/flat-black-coffee.jpg" },
  { id: 109, name: "Ice Coffee", price: 8.5, image: "/iced-coffee-glass.jpg" },
  { id: 110, name: "Frappé Mocha", price: 8.5, image: "/frappe-mocha-chocolate.jpg" },
  { id: 111, name: "Espresso", price: 8.5, image: "/espresso-coffee-white-cup.jpg" },
  { id: 112, name: "Cortado", price: 8.5, image: "/cortado-coffee-glass.jpg" },
]

export default function MenuGrid({ onAddToOrder }) {
  return (
    <Box sx={{ flex: 1, p: 3, overflowY: "auto", bgcolor: "#fafafa" }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat, index) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            sx={{
              bgcolor: index === 0 ? "#fff" : "white",
              color: index === 0 ? "#1f2937" : "#6b7280",
              border: index === 0 ? "1px solid #ff5722" : "1px solid #e5e7eb",
              borderRadius: "20px",
              fontWeight: 500,
              fontSize: "0.875rem",
              "&:hover": {
                bgcolor: index === 0 ? "#fff" : "#f9fafb",
              },
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2.5,
        }}
      >
        {menuItems.map((item) => (
          <MenuCard key={item.id} item={item} onAddToOrder={onAddToOrder} />
        ))}
      </Box>
    </Box>
  )
}
