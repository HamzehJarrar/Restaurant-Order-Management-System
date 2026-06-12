import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Card, CardContent, Typography, Container,
    Chip, Button, CardMedia, TextField, InputAdornment,
    CircularProgress, Stack
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    EditTwoTone as EditIcon,
    DeleteOutlineTwoTone as DeleteIcon,
    FastfoodTwoTone as FoodIcon,
} from '@mui/icons-material';
import { getMenu, createItem, getMenuItemById, updateItem, deleteItem } from '../../api/menu.api';
import Navbar from "../../components/layout/navbar";
import DishDialog from './DishDialog';
import ConfirmDialog from './ConfirmDialog';

function MenuDashboard() {
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editDish, setEditDish] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteDish, setDeleteDish] = useState(null);
    const [newDish, setNewDish] = useState({ name: '', description: '', price: '', category: '', image: null });

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await getMenu();
                setMenuData(response);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenuData();
    }, []);

    const categories = ['All', ...Array.from(new Set(menuData.map(i => i.category).filter(Boolean)))];

    const filtered = menuData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddDish = async () => {
        try {
            const created = await createItem(newDish);
            setMenuData(prev => [...prev, created]);
            setNewDish({ name: '', description: '', price: '', category: '', image: null });
            setOpenDialog(false);
        } catch (error) {
            console.error("Error adding dish:", error);
        }
    };

    const handleOpenEditDialog = async (itemId) => {
        try {
            const itemData = await getMenuItemById(itemId);
            setEditDish(itemData);
            setOpenEditDialog(true);
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    };

    const handleSaveEditDish = async () => {
        try {
            const updated = await updateItem(editDish._id, editDish);
            setMenuData(prev => prev.map(i => i._id === updated._id ? updated : i));
            setOpenEditDialog(false);
            setEditDish(null);
        } catch (error) {
            console.error("Error updating dish:", error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            if (deleteDish) {
                await deleteItem(deleteDish._id);
                setMenuData(prev => prev.filter(i => i._id !== deleteDish._id));
                setOpenDeleteDialog(false);
                setDeleteDish(null);
            }
        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', pb: 8 }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ pt: 5 }}>
                {/* Page Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    mb: 4,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box>
                        <Typography variant="h4" fontWeight={700}>Menu Dashboard</Typography>
                        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                            {menuData.length} item{menuData.length !== 1 ? 's' : ''} · Manage your restaurant's offerings
                        </Typography>
                    </Box>
                    <Button
                        onClick={() => setOpenDialog(true)}
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        sx={{ alignSelf: 'center' }}
                    >
                        Add New Dish
                    </Button>
                </Box>

                {/* Search */}
                <TextField
                    placeholder="Search dishes..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    sx={{ mb: 3, width: { xs: '100%', md: 360 } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="disabled" />
                            </InputAdornment>
                        )
                    }}
                />

                {/* Category Chips */}
                <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', rowGap: 1 }}>
                    {categories.map(cat => (
                        <Chip
                            key={cat}
                            label={cat}
                            onClick={() => setActiveCategory(cat)}
                            color={activeCategory === cat ? 'secondary' : 'default'}
                            variant={activeCategory === cat ? 'filled' : 'outlined'}
                            sx={{
                                fontWeight: 600,
                                color: activeCategory === cat ? 'white' : 'text.secondary'
                            }}
                        />
                    ))}
                </Stack>

                {/* Content */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : filtered.length > 0 ? (
                    <Grid container spacing={3}>
                        {filtered.map(item => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="170"
                                            image={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
                                            alt={item.name}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <Chip
                                            label={`$${item.price}`}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                left: 10,
                                                fontWeight: 700,
                                                bgcolor: 'rgba(255,255,255,0.92)',
                                                backdropFilter: 'blur(4px)',
                                                color: 'text.primary'
                                            }}
                                        />
                                        {item.category && (
                                            <Chip
                                                label={item.category}
                                                size="small"
                                                color="secondary"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    fontSize: 11
                                                }}
                                            />
                                        )}
                                    </Box>

                                    <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1" fontWeight={700} noWrap>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            mt: 0.5,
                                            mb: 2,
                                            flex: 1,
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {item.description || 'Freshly prepared with quality ingredients.'}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                startIcon={<EditIcon />}
                                                onClick={() => handleOpenEditDialog(item._id)}
                                                sx={{ flex: 1, borderRadius: 10 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => { setDeleteDish(item); setOpenDeleteDialog(true); }}
                                                sx={{ flex: 1, borderRadius: 10 }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 12 }}>
                        <FoodIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" fontWeight={600}>
                            {search || activeCategory !== 'All'
                                ? 'No dishes match your filters.'
                                : 'Your menu is empty.'}
                        </Typography>
                        {!search && activeCategory === 'All' && (
                            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                                Click "Add New Dish" to get started.
                            </Typography>
                        )}
                    </Box>
                )}
            </Container>

            <DishDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title="Add New Dish"
                dish={newDish}
                setDish={setNewDish}
                onSubmit={handleAddDish}
                submitText="Add Dish"
            />
            <DishDialog
                open={openEditDialog}
                onClose={() => { setOpenEditDialog(false); setEditDish(null); }}
                title="Edit Dish"
                dish={editDish}
                setDish={setEditDish}
                onSubmit={handleSaveEditDish}
                submitText="Save Changes"
            />
            <ConfirmDialog
                open={openDeleteDialog}
                onClose={() => { setOpenDeleteDialog(false); setDeleteDish(null); }}
                onConfirm={handleConfirmDelete}
                title="Delete Dish?"
                message={`Are you sure you want to delete "${deleteDish?.name}"? This action cannot be undone.`}
            />
        </Box>
    );
}

export default MenuDashboard;
