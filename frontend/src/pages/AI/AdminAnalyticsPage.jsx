import { useEffect, useState } from "react";
import {
    Box, Grid, Card, CardContent, Typography, Button, Skeleton,
    Avatar, Stack, Divider, Container, Paper, Chip, List,
    ListItem, ListItemAvatar, ListItemText,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RefreshIcon from "@mui/icons-material/Refresh";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Navbar from "../../components/layout/navbar";
import { getSalesAnalytics, getBestSellers, getPeakHours, getAIInsights } from "../../api/analytics.api";

const STAT_COLORS = {
    success: { bg: "rgba(16,185,129,0.1)", fg: "#10b981" },
    warning: { bg: "rgba(245,158,11,0.1)", fg: "#f59e0b" },
    info:    { bg: "rgba(14,165,233,0.1)", fg: "#0ea5e9" },
};

const StatCard = ({ title, value, loading, icon, color }) => {
    const c = STAT_COLORS[color] ?? STAT_COLORS.info;
    return (
        <Card elevation={0} sx={{
            border: "1px solid rgba(148,163,184,0.18)",
            borderTop: `3px solid ${c.fg}`,
            height: "100%",
        }}>
            <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: c.bg, color: c.fg, width: 48, height: 48 }}>
                        {icon}
                    </Avatar>
                    <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}
                            textTransform="uppercase" letterSpacing={0.5}>
                            {title}
                        </Typography>
                        {loading
                            ? <Skeleton width={80} height={36} />
                            : <Typography variant="h5" fontWeight={800}>{value}</Typography>
                        }
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

const AdminAnalyticsPage = () => {
    const [loading, setLoading]       = useState(true);
    const [sales, setSales]           = useState(0);
    const [bestSellers, setBestSellers] = useState([]);
    const [peakHours, setPeakHours]   = useState([]);
    const [aiInsights, setAiInsights] = useState("");
    const [aiLoading, setAiLoading]   = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [salesRes, bestRes, peakRes] = await Promise.all([
                getSalesAnalytics(),
                getBestSellers(),
                getPeakHours(),
            ]);
            setSales(salesRes.data.data.todaySales ?? 0);
            setBestSellers(bestRes.data.data ?? []);
            setPeakHours(peakRes.data.data.peakHours ?? []);
        } catch (e) {
            console.error("Analytics error:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleAIInsights = async () => {
        setAiLoading(true);
        try {
            const res = await getAIInsights();
            setAiInsights(res.data.data);
        } catch {
            setAiInsights("Failed to generate insights. Please try again.");
        } finally {
            setAiLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>

                {/* Header */}
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} mb={4}>
                    <Box>
                        <Typography variant="h4" fontWeight={800} color="primary.main">
                            Analytics Dashboard
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={0.5}>
                            Real-time performance and AI-driven insights
                        </Typography>
                    </Box>
                    <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchData}
                        sx={{ borderRadius: 3, flexShrink: 0 }}>
                        Refresh
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {/* Stat Cards */}
                    <Grid item xs={12} sm={4}>
                        <StatCard title="Today's Sales" value={`₪${sales.toLocaleString()}`}
                            loading={loading} icon={<TrendingUpIcon />} color="success" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard title="Top Dish" value={bestSellers[0]?._id || "No data"}
                            loading={loading} icon={<StarIcon />} color="warning" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard
                            title="Peak Hour"
                            value={peakHours[0]?._id?.hour !== undefined ? `${peakHours[0]._id.hour}:00` : "—"}
                            loading={loading} icon={<AccessTimeIcon />} color="info" />
                    </Grid>

                    {/* Best Sellers List */}
                    {bestSellers.length > 0 && (
                        <Grid item xs={12} md={5}>
                            <Card elevation={0} sx={{ border: "1px solid rgba(148,163,184,0.18)", height: "100%" }}>
                                <CardContent sx={{ p: 2.5 }}>
                                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                                        <EmojiEventsIcon color="warning" fontSize="small" />
                                        <Typography variant="subtitle1" fontWeight={700}>Best Sellers</Typography>
                                    </Stack>
                                    <Divider sx={{ mb: 1 }} />
                                    <List disablePadding>
                                        {bestSellers.slice(0, 5).map((item, i) => (
                                            <ListItem key={i} disableGutters sx={{ py: 1 }}>
                                                <ListItemAvatar sx={{ minWidth: 40 }}>
                                                    <Chip label={`#${i + 1}`} size="small" sx={{
                                                        fontWeight: 800, fontSize: 11,
                                                        bgcolor: i === 0 ? "rgba(245,158,11,0.15)" : "rgba(15,23,42,0.05)",
                                                        color: i === 0 ? "#d97706" : "text.secondary",
                                                    }} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={<Typography variant="body2" fontWeight={700}>{item._id}</Typography>}
                                                    secondary={`${item.totalSold ?? item.count ?? "—"} sold`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}

                    {/* Peak Hours */}
                    {peakHours.length > 0 && (
                        <Grid item xs={12} md={bestSellers.length > 0 ? 7 : 12}>
                            <Card elevation={0} sx={{ border: "1px solid rgba(148,163,184,0.18)", height: "100%" }}>
                                <CardContent sx={{ p: 2.5 }}>
                                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                                        <AccessTimeIcon color="info" fontSize="small" />
                                        <Typography variant="subtitle1" fontWeight={700}>Peak Traffic Hours</Typography>
                                    </Stack>
                                    <Divider sx={{ mb: 2 }} />
                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                        {peakHours.slice(0, 8).map((h, i) => (
                                            <Chip
                                                key={i}
                                                label={`${h._id?.hour}:00`}
                                                size="small"
                                                variant={i === 0 ? "filled" : "outlined"}
                                                color={i === 0 ? "secondary" : "default"}
                                                sx={{ fontWeight: 700, color: i === 0 ? "white" : undefined }}
                                            />
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}

                    {/* AI Insights */}
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{
                            borderRadius: 3,
                            p: { xs: 2.5, md: 3 },
                            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,245,235,0.9) 100%)",
                            border: "1px solid rgba(245,158,11,0.2)",
                        }}>
                            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                                <Avatar sx={{ bgcolor: "rgba(245,158,11,0.1)", color: "#f59e0b", width: 40, height: 40 }}>
                                    <AutoAwesomeIcon fontSize="small" />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={700}>AI Business Intelligence</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Powered by Claude · Analyze your restaurant data
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ mb: 2.5 }} />

                            <Box sx={{ minHeight: 80, mb: 2.5 }}>
                                {aiLoading ? (
                                    <Stack spacing={1.5}>
                                        <Skeleton width="95%" height={20} />
                                        <Skeleton width="80%" height={20} />
                                        <Skeleton width="88%" height={20} />
                                    </Stack>
                                ) : (
                                    <Typography variant="body1" sx={{
                                        lineHeight: 1.8, whiteSpace: "pre-line",
                                        fontStyle: aiInsights ? "normal" : "italic",
                                        color: aiInsights ? "text.primary" : "text.secondary",
                                    }}>
                                        {aiInsights || "Click \"Generate Insights\" to get AI-powered analysis of your restaurant's performance."}
                                    </Typography>
                                )}
                            </Box>

                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<AutoAwesomeIcon />}
                                onClick={handleAIInsights}
                                disabled={aiLoading || loading}
                                sx={{ borderRadius: 3 }}
                            >
                                {aiInsights ? "Regenerate Insights" : "Generate Insights"}
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AdminAnalyticsPage;
