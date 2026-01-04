import { Box, Typography, Divider, Button, TextField, Chip } from "@mui/material"; // أضفنا Chip هنا
import { getOrderByTable, updateOrder, updateStatus, deleteOrder } from "../../../api/order.api";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WalletIcon from '@mui/icons-material/Wallet';
import { useTableStore } from "../../../store/Table.store";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useState } from "react";

const TableSummary = ({ table }) => {
  const order = useTableStore((state) => state.order);
  const setOrder = useTableStore((state) => state.setOrder);
  const [orderNotes, setOrderNotes] = useState("");

  const now = new Date();

  const getStatusColor = (status) => {
    switch (status) {
      case "cooking": return "primary";
      case "ready": return "success";
      case "OPEN": return "warning";
      case "paid": return "success";
      case "pending": return "default";
      default: return "default";
    }
  };

  useEffect(() => {
    if (!table) return;

    const fetchOrder = async () => {
      try {
        const data = await getOrderByTable(table._id);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        setOrder(null);
      }
    };

    fetchOrder();
  }, [table, setOrder]);

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = order.items.map((orderItem) =>
      orderItem._id === item._id ? { ...orderItem, quantity: newQuantity } : orderItem
    );

    try {
      const updatedOrder = await updateOrder(order._id, { items: updatedItems });
      setOrder(updatedOrder);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    const updatedItems = order.items.filter((item) => item._id !== itemId);

    try {
      const updatedOrder = await updateOrder(order._id, { items: updatedItems });
      setOrder(updatedOrder);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const sndToKitchen = async () => {
    try {
      const updatedOrder = await updateStatus(order._id, {
        status: "OPEN",
        notes: orderNotes
      });

      setOrder(updatedOrder);
      setOrderNotes("");
    } catch (error) {
      console.error("Error sending to kitchen:", error);
    }
  };

  const deleteTheOrder = async () => {
    try {
      await updateStatus(order._id, { status: "pending" });
      await deleteOrder(order._id);
      setOrder(null);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const payMent = async () => {
    try {
      const updatedOrder = await updateStatus(order._id, { status: "paid" });
      setOrder(null);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Box p={2} border="1px solid #ccc" borderRadius={2} width={400} bgcolor={"white"} boxShadow={3}>
      <Typography variant="h6">{now.toLocaleTimeString()}</Typography>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" color="#E64A19" mt={1} mb={1}>Table {table.number}</Typography>
        <Typography variant="subtitle2" color="textSecondary">Order: #00{table._id.slice(-3)}</Typography>
      </Box>
      <Divider />

      {order && order.items && order.items.length > 0 ? (
        <Box mt={2} gap={1} display="flex" flexDirection="column">
          
          
          <Box display="flex" justifyContent="flex-start" mb={1}>
            <Chip 
              label={order.status.toUpperCase()} 
              color={getStatusColor(order.status)} 
              size="small"
              sx={{ fontWeight: "bold", px: 1 }}
            />
          </Box>

          {order.items.map((item, index) => (
            <Box key={item._id || index} mb={1} display="flex" alignItems="center" justifyContent="space-between">
              <img
                src={item.menuItemId?.image || item.image || "/placeholder.png"}
                alt={item.name}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 12,
                  objectFit: "cover",
                  borderRadius: 4
                }}
              />
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
                  <Typography variant="h6" fontWeight="bold" color="#F6521F">
                    ₪{(item.quantity * item.price).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" color="#F6521F">₪{item.price}</Typography>
                  <Box display="flex" alignItems="center" ml={2}>
                    <Button variant="contained" onClick={() => updateQuantity(item, item.quantity - 1)} style={btnStyle}>-</Button>
                    <Typography variant="body1" mx={1} sx={qtyBoxStyle}>{item.quantity}</Typography>
                    <Button variant="contained" onClick={() => updateQuantity(item, item.quantity + 1)} style={btnStyle}>+</Button>
                  </Box>
                  <Box component="button" onClick={() => removeItem(item._id)} style={deleteBtnStyle}>
                    <DeleteIcon style={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
          <Divider />
          <TextField
            fullWidth
            label="Order Notes (e.g. No onion)"
            variant="outlined"
            size="small"
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            sx={{ mt: 2, mb: 1 }}
          />
          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">Total</Typography>
              <Typography variant="body1" color="textSecondary">
                items: {order.items.reduce((total, item) => total + item.quantity, 0)}
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="bold" color="#F6521F">
              ₪{order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
          </Box>

          <Button variant="contained" sx={{ mt: 2, bgcolor: "#F6521F" }} fullWidth onClick={sndToKitchen}>
            <RestaurantIcon sx={{ mr: 1 }} /> Send To Kitchen
          </Button>

          <Button variant="contained" sx={{ mt: 2, bgcolor: "#1BA672" }} fullWidth onClick={payMent}>
            <WalletIcon sx={{ mr: 1 }} /> Checkout
          </Button>

          <Button variant="contained" sx={{ mt: 2, bgcolor: "red" }} fullWidth onClick={deleteTheOrder}>
            <DeleteIcon sx={{ mr: 1 }} /> Delete Order
          </Button>

        </Box>
      ) : (
        <Typography mt={2}>No current order for this table.</Typography>
      )}
    </Box>
  );
};

const btnStyle = { width: 30, height: 30, backgroundColor: "white", borderRadius: 5, border: "2px solid #E4E4E4", cursor: "pointer", color: "black", fontWeight: "bold", minWidth: "unset", padding: 0, boxShadow: "none" };
const qtyBoxStyle = { bgcolor: "#E4E4E4", width: 40, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 0.5 };
const deleteBtnStyle = { width: 24, height: 24, borderRadius: "50%", border: "none", backgroundColor: "#FF5252", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 'auto' };

export default TableSummary;