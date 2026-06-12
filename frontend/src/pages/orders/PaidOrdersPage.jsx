import React, { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, Container,
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    List, ListItem, ListItemText, Divider, Avatar, Stack, Card,
    CardActionArea, CardContent, useMediaQuery, Grid, IconButton,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CloseIcon from "@mui/icons-material/Close";
import { getAllOrders } from "../../api/order.api";
import Navbar from "../../components/layout/navbar";
import { useTheme } from "@mui/material/styles";

const PaidOrdersPage = () => {
    const [paidOrders, setPaidOrders] = useState([]);
    const [open, setOpen]             = useState(false);
    const [selected, setSelected]     = useState(null);

    const theme    = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getAllOrders();
                const raw = res.data?.data || res.data || [];
                if (Array.isArray(raw)) {
                    setPaidOrders(
                        raw
                            .filter((o) => o.status === "paid")
                            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                    );
                }
            } catch (e) {
                console.error("Failed to fetch paid orders", e);
            }
        };
        fetch();
    }, []);

    const totalRevenue = paidOrders.reduce((s, o) => s + (o.totalAmount ?? 0), 0);

    const handleOpen  = (order) => { setSelected(order); setOpen(true); };
    const handleClose = () => { setOpen(false); setSelected(null); };

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ pt: 5, pb: 8 }}>

                {/* Header */}
                <Box sx={{
                    display: "flex", alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 4,
                }}>
                    <Box>
                        <Typography variant="h4" fontWeight={800} color="primary.main">
                            Paid Orders
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={0.5}>
                            History of completed transactions
                        </Typography>
                    </Box>
                    <Chip
                        icon={<ReceiptLongIcon fontSize="small" />}
                        label={`${paidOrders.length} orders`}
                        color="secondary"
                        sx={{ fontWeight: 700, color: "white" }}
                    />
                </Box>

                {/* Stat Cards */}
                <Grid container spacing={2} mb={4}>
                    <Grid item xs={6} sm={3}>
                        <StatCard label="Total Orders" value={paidOrders.length} color="#0ea5e9" />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatCard label="Total Revenue" value={`₪${totalRevenue.toFixed(2)}`} color="#10b981" />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatCard
                            label="Avg. Order"
                            value={paidOrders.length ? `₪${(totalRevenue / paidOrders.length).toFixed(2)}` : "—"}
                            color="#f59e0b"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatCard
                            label="Last Order"
                            value={paidOrders[0]
                                ? new Date(paidOrders[0].updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                : "—"}
                            color="#8b5cf6"
                        />
                    </Grid>
                </Grid>

                {paidOrders.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 12 }}>
                        <Typography fontSize={52} mb={2}>🧾</Typography>
                        <Typography variant="h6" color="text.secondary" fontWeight={600}>
                            No paid orders yet.
                        </Typography>
                    </Box>
                ) : isMobile ? (
                    /* Mobile: Cards */
                    <Stack spacing={2}>
                        {paidOrders.map((order) => (
                            <Card key={order._id} elevation={0} sx={{
                                border: "1px solid rgba(148,163,184,0.2)",
                                borderRadius: 3,
                                bgcolor: "rgba(255,255,255,0.9)",
                            }}>
                                <CardActionArea onClick={() => handleOpen(order)}>
                                    <CardContent sx={{ p: 2 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                #{order._id.slice(-6).toUpperCase()}
                                            </Typography>
                                            <Chip label="PAID" color="success" size="small" variant="outlined" />
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Table {order.table?.number ?? "N/A"}
                                                </Typography>
                                                <Typography variant="caption" color="text.disabled">
                                                    {new Date(order.updatedAt).toLocaleString()}
                                                </Typography>
                                            </Box>
                                            <Typography variant="h6" fontWeight={800} color="success.main">
                                                ₪{order.totalAmount?.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Stack>
                ) : (
                    /* Desktop: Table */
                    <TableContainer component={Paper} elevation={0} sx={{
                        border: "1px solid rgba(148,163,184,0.2)",
                        borderRadius: 3,
                        bgcolor: "rgba(255,255,255,0.92)",
                        overflow: "hidden",
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "rgba(15,23,42,0.03)" }}>
                                    {["Order ID", "Table", "Date & Time", "Amount", "Status"].map((h) => (
                                        <TableCell key={h} sx={{ fontWeight: 700, color: "text.secondary", fontSize: 13 }}>
                                            {h}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paidOrders.map((order) => (
                                    <TableRow key={order._id} hover onClick={() => handleOpen(order)}
                                        sx={{ cursor: "pointer", "&:last-child td": { border: 0 } }}>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={700}>
                                                #{order._id.slice(-6).toUpperCase()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>Table {order.table?.number ?? "N/A"}</TableCell>
                                        <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                                            {new Date(order.updatedAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight={800} color="success.main">
                                                ₪{order.totalAmount?.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label="PAID" color="success" variant="outlined" size="small" sx={{ fontWeight: 700 }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>

            {/* Order Detail Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm"
                PaperProps={{ sx: { borderRadius: 3 } }}>
                {selected && (
                    <>
                        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    Order #{selected._id.slice(-6).toUpperCase()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Table {selected.table?.number ?? "N/A"} · {new Date(selected.updatedAt).toLocaleString()}
                                </Typography>
                            </Box>
                            <IconButton size="small" onClick={handleClose}><CloseIcon fontSize="small" /></IconButton>
                        </DialogTitle>
                        <Divider />

                        <DialogContent sx={{ p: 0 }}>
                            <List disablePadding>
                                {selected.items.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <ListItem sx={{ px: 3, py: 2 }}>
                                            <Avatar
                                                src={item.menuItemId?.image || item.image}
                                                variant="rounded"
                                                sx={{ width: 52, height: 52, mr: 2, borderRadius: 2 }}
                                            >
                                                {item.name?.charAt(0)}
                                            </Avatar>
                                            <ListItemText
                                                primary={<Typography fontWeight={700}>{item.name}</Typography>}
                                                secondary={`₪${item.price?.toFixed(2)} each`}
                                            />
                                            <Box sx={{ textAlign: "right" }}>
                                                <Chip label={`×${item.quantity}`} size="small"
                                                    sx={{ fontWeight: 700, mb: 0.5, bgcolor: "rgba(15,23,42,0.06)" }} />
                                                <Typography variant="body2" fontWeight={800} color="secondary.main" display="block">
                                                    ₪{(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </ListItem>
                                        {i < selected.items.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>

                            <Box sx={{
                                mx: 3, mb: 3, p: 2, borderRadius: 3,
                                bgcolor: "rgba(16,185,129,0.06)",
                                border: "1px solid rgba(16,185,129,0.2)",
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                            }}>
                                <Typography variant="subtitle1" fontWeight={700}>Total Amount</Typography>
                                <Typography variant="h6" fontWeight={800} color="success.main">
                                    ₪{selected.totalAmount?.toFixed(2)}
                                </Typography>
                            </Box>
                        </DialogContent>

                        <DialogActions sx={{ px: 3, pb: 3 }}>
                            <Button onClick={handleClose} variant="contained" color="primary" fullWidth sx={{ borderRadius: 3 }}>
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

const StatCard = ({ label, value, color }) => (
    <Paper elevation={0} sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        border: "1px solid rgba(148,163,184,0.2)",
        bgcolor: "rgba(255,255,255,0.9)",
        borderTop: `3px solid ${color}`,
    }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
            {label}
        </Typography>
        <Typography variant="h6" fontWeight={800} mt={0.5}>{value}</Typography>
    </Paper>
);

export default PaidOrdersPage;
