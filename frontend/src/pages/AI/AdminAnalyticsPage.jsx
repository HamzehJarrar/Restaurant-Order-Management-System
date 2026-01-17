import { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Skeleton,
    Avatar,
    Stack,
    Divider,
    Container,
    Paper,
} from "@mui/material";
import {
    TrendingUp,
    Star,
    AccessTime,
    AutoAwesome,
    Refresh,
} from "@mui/icons-material";

import {
    getSalesAnalytics,
    getBestSellers,
    getPeakHours,
    getAIInsights,
} from "../../api/analytics.api";
import Navbar from "../../components/layout/navbar";

const StatCard = ({ title, value, loading, icon, color }) => (
    <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", height: "100%" }}>
        <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                    sx={{
                        bgcolor: `${color}.light`,
                        color: `${color}.main`,
                        width: 48,
                        height: 48,
                    }}
                >
                    {icon}
                </Avatar>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
                        {title}
                    </Typography>
                    {loading ? (
                        <Skeleton width={80} height={40} />
                    ) : (
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {value}
                        </Typography>
                    )}
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

const AdminAnalyticsPage = () => {
    const [loading, setLoading] = useState(true);
    const [sales, setSales] = useState(0);
    const [bestSellers, setBestSellers] = useState([]);
    const [peakHours, setPeakHours] = useState([]);
    const [aiInsights, setAiInsights] = useState("");
    const [aiLoading, setAiLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [salesRes, bestRes, peakRes] = await Promise.all([
                getSalesAnalytics(),
                getBestSellers(),
                getPeakHours(),
            ]);

            setSales(salesRes.data.data.todaySales || 0);
            setBestSellers(bestRes.data.data || []);
            setPeakHours(peakRes.data.data.peakHours || []);
        } catch (error) {
            console.error("Analytics error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAIInsights = async () => {
        try {
            setAiLoading(true);
            const res = await getAIInsights();
            setAiInsights(res.data.data);
        } catch (error) {
            console.error("AI Insights error:", error);
            setAiInsights("Failed to generate insights. Please try again.");
        } finally {
            setAiLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ py: 5 }}>
                {/* Header Section */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                    <Box>
                        <Typography variant="h4" fontWeight={800} color="primary.main">
                            Analytics Dashboard
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Real-time performance and AI-driven insights.
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={fetchData}
                        sx={{ borderRadius: 2 }}
                    >
                        Refresh
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {/* Stats Cards */}
                    <Grid item xs={12} md={4}>
                        <StatCard
                            title="Today's Sales"
                            value={`$${sales.toLocaleString()}`}
                            loading={loading}
                            icon={<TrendingUp />}
                            color="success"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <StatCard
                            title="Top Selling Product"
                            value={bestSellers[0]?._id || "No Data"}
                            loading={loading}
                            icon={<Star />}
                            color="warning"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <StatCard
                            title="Peak Traffic Hour"
                            value={peakHours[0]?._id?.hour !== undefined ? `${peakHours[0]._id.hour}:00` : "—"}
                            loading={loading}
                            icon={<AccessTime />}
                            color="info"
                        />
                    </Grid>

                    {/* AI INSIGHTS SECTION */}
                    <Grid item xs={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                p: 3,
                                background: "linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)",
                                border: "1px solid",
                                borderColor: "primary.light",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                                <AutoAwesome color="primary" />
                                <Typography variant="h6" fontWeight={700}>
                                    AI Business Intelligence
                                </Typography>
                            </Stack>

                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ minHeight: 80 }}>
                                {aiLoading ? (
                                    <Stack spacing={1}>
                                        <Skeleton width="90%" />
                                        <Skeleton width="70%" />
                                    </Stack>
                                ) : (
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            lineHeight: 1.7,
                                            color: "text.primary",
                                            whiteSpace: "pre-line",
                                            fontStyle: aiInsights ? "normal" : "italic",
                                            opacity: aiInsights ? 1 : 0.6
                                        }}
                                    >
                                        {aiInsights || "Our AI is ready to analyze your data. Click generate to start."}
                                    </Typography>
                                )}
                            </Box>

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<AutoAwesome />}
                                onClick={handleAIInsights}
                                disabled={aiLoading || loading}
                                sx={{
                                    mt: 3,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
                                }}
                            >
                                {aiInsights ? "Regenerate Insights" : "Generate AI Insights"}
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AdminAnalyticsPage;