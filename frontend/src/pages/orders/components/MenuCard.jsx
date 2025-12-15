import { Card, CardContent, CardMedia, Typography, IconButton, Box } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useState } from "react"

export default function MenuCard({ item, onAddToOrder }) {
  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => setQuantity((q) => q + 1)
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1))

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "none",
        bgcolor: "#f8f9fa",
        border: "none",
        transition: "all 0.2s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={item.image}
        alt={item.name}
        sx={{
          objectFit: "cover",
          bgcolor: "#ffffff",
          padding: "16px",
        }}
      />
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#1f2937", mb: 0.5 }}>
          {item.name}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mb: 0.5 }}>
          Price
        </Typography>
        <Typography variant="h6" fontWeight={700} sx={{ color: "#ef4444", mb: 1.5 }}>
          $ {item.price.toFixed(2)}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "white",
            borderRadius: "8px",
            p: 0.5,
          }}
        >
          <IconButton
            size="small"
            onClick={handleDecrement}
            sx={{
              bgcolor: "transparent",
              color: "#6b7280",
              "&:hover": { bgcolor: "#f3f4f6" },
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography fontWeight={600} sx={{ color: "#1f2937" }}>
            {quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={handleIncrement}
            sx={{
              bgcolor: "#ff5722",
              color: "white",
              "&:hover": { bgcolor: "#f4511e" },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}
