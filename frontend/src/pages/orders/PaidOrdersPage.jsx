import React, { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, Container,
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    List, ListItem, ListItemText, Divider, Avatar
} from "@mui/material";
import { getAllOrders } from "../../api/order.api";
import Navbar from "../../components/layout/navbar";

const PaidOrdersPage = () => {
    const [paidOrders, setPaidOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);


    useEffect(() => {
        const fetchPaid = async () => {
            try {
                const res = await getAllOrders();
                // التعامل مع هيكلية الـ response المختلفة
                const rawData = res.data?.data || res.data || [];
                if (Array.isArray(rawData)) {
                    const filtered = rawData.filter(order => order.status === "paid");
                    setPaidOrders(filtered);
                }
            } catch (err) {
                console.error("Failed to fetch paid orders", err);
            }
        };
        fetchPaid();
    }, []);

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    return (
        <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                    Paid Orders History
                </Typography>

                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#eeeeee" }}>
                            <TableRow>
                                <TableCell><strong>Order ID</strong></TableCell>
                                <TableCell><strong>Table</strong></TableCell>
                                <TableCell><strong>Date</strong></TableCell>
                                <TableCell><strong>Total Amount</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paidOrders.map((order) => (
                                <TableRow
                                    key={order._id}
                                    hover
                                    onClick={() => handleRowClick(order)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <TableCell>#{order._id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell>Table {order.table?.number || "N/A"}</TableCell>
                                    <TableCell>{new Date(order.updatedAt).toLocaleString()}</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                                        ₪{order.totalAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label="PAID" color="success" variant="outlined" size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                {selectedOrder && (
                    <>
                        <DialogTitle sx={{ fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                            Order Details - #{selectedOrder._id.slice(-6).toUpperCase()}
                        </DialogTitle>

                        <DialogContent dividers>
                            <List>
                                {selectedOrder.items.map((item, index) => {
                                    const itemImage = item.menuItemId?.image || item.image || "placeholder.png";

                                    return (
                                        <React.Fragment key={index}>
                                            <ListItem sx={{ px: 0, py: 1.5 }}>
                                                {/* عرض الصورة بشكل دائري أنيق باستخدام Avatar */}
                                                <Avatar
                                                    src={itemImage}
                                                    variant="rounded"
                                                    sx={{ width: 60, height: 60, mr: 2, border: "1px solid #eee" }}
                                                >
                                                    {item.name.charAt(0)}
                                                </Avatar>

                                                <ListItemText
                                                    primary={<Typography fontWeight="bold">{item.name}</Typography>}
                                                    secondary={`Price: ₪${item.price.toFixed(2)}`}
                                                />

                                                <Box sx={{ textAlign: "right" }}>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        x{item.quantity}
                                                    </Typography>
                                                    <Typography variant="body2" color="primary" fontWeight="bold">
                                                        ₪{(item.price * item.quantity).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                            </ListItem>
                                            {index < selectedOrder.items.length - 1 && <Divider />}
                                        </React.Fragment>
                                    );
                                })}
                            </List>

                            <Box sx={{ mt: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 2, display: "flex", justifyContent: "space-between", border: "1px solid #eee" }}>
                                <Typography variant="h6" fontWeight="bold">Total Amount:</Typography>
                                <Typography variant="h6" fontWeight="bold" color="success.main">
                                    ₪{selectedOrder.totalAmount.toFixed(2)}
                                </Typography>
                            </Box>
                        </DialogContent>

                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={handleClose} color="primary" variant="contained" fullWidth>
                                Close Details
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default PaidOrdersPage;