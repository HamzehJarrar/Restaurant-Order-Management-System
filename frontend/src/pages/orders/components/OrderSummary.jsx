import { Box, Typography, Button, IconButton, Divider } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import PrintIcon from "@mui/icons-material/Print"
import CreditCardIcon from "@mui/icons-material/CreditCard"

export default function OrderSummary({ items, onUpdateQuantity, onRemoveItem }) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Box
      sx={{
        width: 380,
        bgcolor: "white",
        borderLeft: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
        <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mb: 1 }}>
          Invoice No: 123454 23/01/2024 | 14:00:23
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#ff5722",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "1.2rem",
            }}
          >
            E
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700} sx={{ color: "#1f2937" }}>
              Easy POS
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              easypos@gmail.com
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            py: 1.5,
            px: 2.5,
            bgcolor: "#fff7ed",
            borderRadius: "12px",
          }}
        >
          <Box>
            <Typography variant="body2" fontWeight={700} sx={{ color: "#ff5722" }}>
              Table 04
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" fontWeight={600} sx={{ color: "#1f2937" }}>
              Order: #0029
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                gap: 2,
                mb: 2.5,
                pb: 2.5,
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "12px",
                  objectFit: "cover",
                  bgcolor: "#f9fafb",
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ color: "#1f2937" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#ef4444" }}>
                    ${item.price}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mb: 0.5 }}>
                  ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mb: 1.5 }}>
                  Size: {item.size}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      bgcolor: "#f9fafb",
                      borderRadius: "8px",
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      sx={{
                        bgcolor: "transparent",
                        width: 28,
                        height: 28,
                        color: "#6b7280",
                        "&:hover": { bgcolor: "#fff" },
                      }}
                    >
                      <RemoveIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Typography variant="body2" fontWeight={600} sx={{ minWidth: 24, textAlign: "center" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      sx={{
                        bgcolor: "transparent",
                        width: 28,
                        height: 28,
                        color: "#6b7280",
                        "&:hover": { bgcolor: "#fff" },
                      }}
                    >
                      <AddIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                  <IconButton size="small" onClick={() => onRemoveItem(item.id)} sx={{ color: "#9ca3af" }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, color: "#1f2937" }}>
            Total
          </Typography>
          <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mb: 1 }}>
            Items: {totalItems}, Quantity: {totalItems}
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#ef4444", textAlign: "right", mt: 1 }}>
            ${totalPrice}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<PrintIcon />}
          sx={{
            mb: 1.5,
            borderColor: "#e5e7eb",
            color: "#6b7280",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "12px",
            py: 1.5,
            "&:hover": {
              borderColor: "#d1d5db",
              bgcolor: "#f9fafb",
            },
          }}
        >
          Print Invoice
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<CreditCardIcon />}
          sx={{
            bgcolor: "#10b981",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "12px",
            py: 1.5,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#059669",
              boxShadow: "none",
            },
          }}
        >
          Payments
        </Button>
      </Box>
    </Box>
  )
}
