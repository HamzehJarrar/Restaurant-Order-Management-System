import {
  Box, Typography, Divider, Button, TextField, Chip,
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, IconButton, Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WalletIcon from "@mui/icons-material/Wallet";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { getOrderByTable, updateOrder, updateStatus, deleteOrder } from "../../../api/order.api";
import { useEffect, useState } from "react";
import { useTableStore } from "../../../store/Table.store";
import { toast, ToastContainer } from "react-toastify";

const statusColor = (s) => {
  switch (s?.toLowerCase()) {
    case "cooking": return "primary";
    case "ready":   return "success";
    case "open":    return "warning";
    case "paid":    return "success";
    default:        return "default";
  }
};

const TableSummary = ({ table }) => {
  const order    = useTableStore((s) => s.order);
  const setOrder = useTableStore((s) => s.setOrder);
  const [notes, setNotes]           = useState("");
  const [open, setOpen]             = useState(false);
  const [actionType, setActionType] = useState("");
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    if (!table?._id) return;
    getOrderByTable(table._id)
      .then(setOrder)
      .catch(() => setOrder(null));
    return () => setOrder(null);
  }, [table?._id, setOrder, refetchKey]);

  const updateQuantity = async (item, qty) => {
    if (qty < 1) return;
    const items = order.items.map((i) => i._id === item._id ? { ...i, quantity: qty } : i);
    try {
      setOrder(await updateOrder(order._id, { items, tableId: table._id }));
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (itemId) => {
    const items = order.items.filter((i) => i._id !== itemId);
    try {
      setOrder(await updateOrder(order._id, { items, tableId: table._id }));
      toast.info("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const actionsMap = {
    sendToKitchen: {
      title: "Send to Kitchen?",
      text:  "Confirm sending this order to the kitchen.",
      color: "#f97316",
      handler: async () => {
        setOrder(await updateStatus(order._id, { status: "OPEN", notes }));
        setNotes("");
      },
      successMsg: "Order sent to kitchen!",
    },
    deleteOrder: {
      title: "Delete Order?",
      text:  "This action cannot be undone.",
      color: "#ef4444",
      handler: async () => {
        await deleteOrder(order._id);
        setOrder(null);
        setRefetchKey((k) => k + 1);
      },
      successMsg: "Order deleted.",
    },
    payment: {
      title: "Checkout?",
      text:  "Process payment and close the table.",
      color: "#10b981",
      handler: async () => {
        await updateStatus(order._id, { status: "paid" });
        setOrder(null);
        setRefetchKey((k) => k + 1);
      },
      successMsg: "Payment processed!",
    },
  };

  const handleOpen  = (t) => { setActionType(t); setOpen(true); };
  const handleClose = () => { setOpen(false); setActionType(""); };
  const handleYes   = async () => {
    const a = actionsMap[actionType];
    try { await a.handler(); toast.success(a.successMsg); }
    catch { toast.error("Operation failed."); }
    finally { handleClose(); }
  };

  const total     = order?.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0;
  const itemCount = order?.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;
  const now       = new Date();

  return (
    <Box sx={{
      p: { xs: 2, md: 2.5 },
      border: "1px solid rgba(148,163,184,0.2)",
      borderRadius: 4,
      bgcolor: "rgba(255,255,255,0.92)",
      boxShadow: "0 16px 40px rgba(15,23,42,0.1)",
      position: { xs: "static", md: "sticky" },
      top: 80,
      width: "100%",
    }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
        <Box>
          <Typography variant="h6" fontWeight={800} color="secondary.main">
            Table {table?.number}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Typography>
        </Box>
        {order && (
          <Box sx={{ textAlign: "right" }}>
            <Chip label={order.status?.toUpperCase()} color={statusColor(order.status)}
              size="small" sx={{ fontWeight: 700, display: "block", mb: 0.5 }} />
            <Typography variant="caption" color="text.disabled">
              #{order._id.slice(-6).toUpperCase()}
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {order?.items?.length > 0 ? (
        <>
          {/* Items */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
            {order.items.map((item, idx) => (
              <Box key={item._id ?? idx} sx={{
                display: "flex", alignItems: "center", gap: 1.5,
                p: 1.2, borderRadius: 3,
                bgcolor: "rgba(248,245,240,0.8)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}>
                <Avatar
                  src={item.menuItemId?.image || item.image}
                  variant="rounded"
                  sx={{ width: 44, height: 44, borderRadius: 2, flexShrink: 0 }}
                >
                  {item.name?.charAt(0)}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={700} noWrap>{item.name}</Typography>
                  <Typography variant="caption" color="text.secondary">₪{item.price}</Typography>
                </Box>

                {/* Qty controls */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <IconButton size="small" onClick={() => updateQuantity(item, item.quantity - 1)}
                    sx={{ width: 24, height: 24, border: "1px solid rgba(148,163,184,0.3)", borderRadius: 1.5, bgcolor: "white" }}>
                    <RemoveIcon sx={{ fontSize: 12 }} />
                  </IconButton>
                  <Typography variant="body2" fontWeight={700} sx={{ minWidth: 20, textAlign: "center" }}>
                    {item.quantity}
                  </Typography>
                  <IconButton size="small" onClick={() => updateQuantity(item, item.quantity + 1)}
                    sx={{ width: 24, height: 24, border: "1px solid rgba(148,163,184,0.3)", borderRadius: 1.5, bgcolor: "white" }}>
                    <AddIcon sx={{ fontSize: 12 }} />
                  </IconButton>
                </Box>

                <Box sx={{ textAlign: "right", minWidth: 52 }}>
                  <Typography variant="body2" fontWeight={700} color="secondary.main">
                    ₪{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton size="small" onClick={() => removeItem(item._id)}
                    sx={{ p: 0.2, color: "error.main" }}>
                    <DeleteOutlineIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Notes */}
          <TextField
            fullWidth
            placeholder="Special instructions (e.g. no onion)"
            size="small"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ mb: 2 }} />

          {/* Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>Total</Typography>
              <Typography variant="caption" color="text.secondary">{itemCount} item{itemCount !== 1 ? "s" : ""}</Typography>
            </Box>
            <Typography variant="h5" fontWeight={800} color="secondary.main">
              ₪{total.toFixed(2)}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button fullWidth variant="contained" startIcon={<RestaurantIcon />}
              onClick={() => handleOpen("sendToKitchen")}
              sx={{ bgcolor: "#f97316", "&:hover": { bgcolor: "#ea6c0a" }, borderRadius: 3 }}>
              Send to Kitchen
            </Button>
            <Button fullWidth variant="contained" startIcon={<WalletIcon />}
              onClick={() => handleOpen("payment")}
              sx={{ bgcolor: "#10b981", "&:hover": { bgcolor: "#059669" }, borderRadius: 3 }}>
              Checkout
            </Button>
            <Button fullWidth variant="outlined" color="error" startIcon={<DeleteOutlineIcon />}
              onClick={() => handleOpen("deleteOrder")}
              sx={{ borderRadius: 3 }}>
              Delete Order
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography fontSize={36} mb={1}>🍽️</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            No active order
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Select items from the menu to begin.
          </Typography>
        </Box>
      )}

      {/* Confirm Dialog */}
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>{actionsMap[actionType]?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{actionsMap[actionType]?.text}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined" sx={{ flex: 1 }}>Cancel</Button>
          <Button onClick={handleYes} variant="contained" sx={{
            flex: 1,
            bgcolor: actionsMap[actionType]?.color,
            "&:hover": { bgcolor: actionsMap[actionType]?.color, filter: "brightness(0.9)" },
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
};

export default TableSummary;
