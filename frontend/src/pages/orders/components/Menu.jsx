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
        orderId: currentOrder._id,
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
            borderRadius: '12px',
            backgroundColor: '#f9f9f9',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              '& fieldset': {
                borderColor: 'primary.main',
              },
            },
            '&.Mui-focused': {
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0',
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
              fontSize: "1rem",
              borderRadius: "20px",
              transition: "all 0.3s ease",

              backgroundColor: "transparent",
              borderColor: "#FC5832",
              borderWidth: "1px",
              color: "#FC5832",


              ...(selectedCategory === cat && {
                backgroundColor: "#FC5832",
                color: "white",
                boxShadow: "0 4px 10px rgba(255, 87, 51, 0.3)",
                "&:hover": {
                  backgroundColor: "#FC5832",
                },
              }),


              "&:hover": {
                backgroundColor: "rgba(255, 87, 51, 0.08)",
                borderColor: "#FF5733",
              }
            }}
            variant="outlined"
          />
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2,
        }}
      >
        {filteredMenu.map((item) => (
          <Paper
            key={item._id}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 4,
              border: "1px solid #f0f0f0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "background.paper",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                borderColor: "transparent",
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
                backgroundColor: "#f9f9f9",
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
              variant="h5"
              fontWeight="700"
              noWrap
              sx={{ width: "100%", textAlign: "center", mb: 0.5 }}
            >
              {item.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                color: "text.secondary",
                backgroundColor: "#f5f5f5",
                px: 1.5,
                py: 0.2,
                borderRadius: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {item.category}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="800"
              color="#FF5733"
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
                backgroundColor: "#FC5832",
                borderRadius: "12px",
                py: 1.2,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  backgroundColor: "#FC5832",
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