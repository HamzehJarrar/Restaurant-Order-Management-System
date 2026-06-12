import { Box, Button, Typography, Paper, TextField, Stack, Chip, InputAdornment } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getMenu } from "../../../api/menu.api";
import { useTableStore } from "../../../store/Table.store";
import { getOrderByTable, addItemsToOrder } from "../../../api/order.api";
import SearchIcon from '@mui/icons-material/Search';
function Menu({ order, setOrder }) {
  const [tableMenu, setTableMenu] = useState([]);
  const [mealSearch, setMealSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const selectedTable = useTableStore((state) => state.selectedTable);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      const menuData = await getMenu();
      setTableMenu(menuData || []);
    };
    fetchMenu();
  }, []);

  const categories = ["All", ...new Set(tableMenu.map((item) => item.category).filter(Boolean))];

  const filteredMenu = useMemo(() => {
    return tableMenu.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(mealSearch.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
  }, [tableMenu, mealSearch, selectedCategory]);

  const handleAddItem = async (item) => {
    if (!selectedTable) return;
    setLoading(true);
    try {
      let currentOrder = order;
      if (!currentOrder) {
        currentOrder = await getOrderByTable(selectedTable._id);
      }
      const updatedOrder = await addItemsToOrder({
        tableId: selectedTable._id,
        items: [{ menuItemId: item._id, quantity: 1 }],
      });
      setOrder(updatedOrder);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <TextField
        variant="outlined"
        placeholder="Search for food, drinks..."
        value={mealSearch}
        onChange={(e) => setMealSearch(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            backgroundColor: 'rgba(255,255,255,0.92)',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: '#fff',
              '& fieldset': {
                borderColor: 'rgba(249, 115, 22, 0.4)',
              },
            },
            '&.Mui-focused': {
              backgroundColor: '#fff',
              boxShadow: '0 6px 16px rgba(15, 23, 42, 0.12)',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(148, 163, 184, 0.3)',
          },
        }}
      />

      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 3, overflowX: "auto", py: 1, '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            onClick={() => setSelectedCategory(cat)}
              sx={{
                fontWeight: 700,
                textTransform: "capitalize",
                px: 1.5,
                py: 0.5,
                fontSize: "0.95rem",
                borderRadius: "999px",
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
                borderColor: "rgba(245, 158, 11, 0.45)",
                borderWidth: "1px",
                color: "#92400e",
                ...(selectedCategory === cat && {
                  backgroundColor: "#f59e0b",
                  color: "white",
                  boxShadow: "0 6px 16px rgba(245, 158, 11, 0.35)",
                  "&:hover": {
                    backgroundColor: "#d97706",
                  },
                }),
                "&:hover": {
                  backgroundColor: "rgba(245, 158, 11, 0.08)",
                  borderColor: "#fbbf24",
                }
              }}
              variant="outlined"
            />
          ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(160px, 1fr))",
            md: "repeat(auto-fill, minmax(210px, 1fr))",
          },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {filteredMenu.map((item) => (
          <Paper
            key={item._id}
            elevation={0}
            sx={{
              p: { xs: 1.5, md: 2 },
              borderRadius: 4,
              border: "1px solid rgba(148, 163, 184, 0.18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.85)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 20px 35px rgba(15, 23, 42, 0.12)",
                borderColor: "rgba(245, 158, 11, 0.35)",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                mb: 2,
                overflow: "hidden",
                borderRadius: 3,
                backgroundColor: "rgba(15, 23, 42, 0.06)",
              }}
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </Box>

            <Typography
              variant="h6"
              fontWeight="700"
              noWrap
              sx={{ width: "100%", textAlign: "center", mb: 0.5 }}
            >
              {item.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 1.2,
                color: "text.secondary",
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                px: 1.2,
                py: 0.4,
                borderRadius: "999px",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              {item.category}
            </Typography>

            <Typography
              variant="h5"
              fontWeight="800"
              color="#f59e0b"
              sx={{ mb: 2, display: "flex", alignItems: "center", gap: 0.5 }}
            >
              ₪{item.price}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              disableElevation
              disabled={!selectedTable || loading}
              onClick={() => handleAddItem(item)}
              sx={{
                backgroundColor: "#0f172a",
                borderRadius: "12px",
                py: 1.1,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  backgroundColor: "#1f2937",
                },
              }}
            >
              Add to Order
            </Button>
          </Paper>
        ))}
      </Box>

      {filteredMenu.length === 0 && (
        <Typography sx={{ textAlign: 'center', mt: 5, color: 'gray' }}>
          No items found in this category.
        </Typography>
      )}
    </Box>
  );
}

export default Menu;
