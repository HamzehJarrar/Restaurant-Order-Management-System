import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Card, CardContent, Typography, Container,
    Divider, Chip, Button, CardMedia, IconButton,
    TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
    RestaurantMenu as MenuIcon,
    Add as AddIcon,
    Search as SearchIcon,
    EditTwoTone as EditIcon,
    DeleteOutlineTwoTone as DeleteIcon,
    FastfoodTwoTone as FoodIcon
} from '@mui/icons-material';
import { getMenu, createItem, getMenuItemById, updateItem, deleteItem } from '../../api/menu.api';
import Navbar from "../../components/layout/navbar";

function MenuDashboard() {
    const [menuData, setMenuData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editDish, setEditDish] = useState(null);

    const [newDish, setNewDish] = useState({
        name: '',
        description: '',
        price: '',
        image: null
    });
    useEffect(() => {
        const fetchMenuData = async () => {
            try {

                const response = await getMenu();
                setMenuData(response);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            }
        };
        fetchMenuData();
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleAddDish = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newDish.name);
            formData.append('description', newDish.description);
            formData.append('price', newDish.price);

            if (newDish.image) {
                formData.append('image', newDish.image);
            }
            formData.append('category', newDish.category);

            const newDishResponse = await createItem(formData);
            setMenuData([...menuData, newDishResponse]);

            setNewDish({
                name: '',
                description: '',
                price: '',
                image: null
            });


            handleCloseDialog();
        } catch (error) {
            console.error("Error adding new dish:", error);
        }
    };

    const handleOpenEditDialog = async (itemId) => {
        try {
            const itemData = await getMenuItemById(itemId);
            setEditDish(itemData);
            setOpenEditDialog(true);
        } catch (error) {
            console.error("Error fetching item data:", error);
        }
    };
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditDish(null);
    }
    const handleSaveEditDish = async () => {
        try {
            const formData = new FormData();
            formData.append('name', editDish.name);
            formData.append('description', editDish.description);
            formData.append('price', editDish.price);
            if (editDish.image instanceof File) {
                formData.append('image', editDish.image);
            }
            const updatedDish = await updateItem(editDish._id, formData);
            setMenuData(menuData.map(item => item._id === updatedDish._id ? updatedDish : item));
            handleCloseEditDialog();
        } catch (error) {
            console.error("Error updating dish:", error);
        }
    };
    const handleDeleteDish = async (itemId) => {
        try {
            await deleteItem(itemId);
            setMenuData(menuData.filter(item => item._id !== itemId));
        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };


    return (
        <Box sx={{ bgcolor: '#F4F7FE', minHeight: '100vh', pb: 8 }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {/* Search Bar */}
                    <TextField
                        placeholder="Search dishes..."
                        sx={{
                            mb: 5,
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                borderRadius: '15px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                                border: 'none'
                            }
                        }}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><SearchIcon color="disabled" /></InputAdornment>)
                        }}
                    />
                    <Button onClick={handleOpenDialog} variant="contained" color="primary" sx={{ mb: 4, borderRadius: 10 }}>
                        <AddIcon sx={{ mr: 1 }} />
                        Add New Dish
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    {menuData.length > 0 ? (
                        menuData.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                                <Card sx={{
                                    borderRadius: 2,
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: '0 15px 30px rgba(0,0,0,0.08)'
                                    }
                                }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="170"
                                            image={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                                            alt={item.name}
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 10,
                                            left: 10,
                                            bgcolor: 'rgba(255,255,255,0.9)',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontWeight: 600
                                        }}>
                                            ${item.price}
                                        </Box>
                                    </Box>

                                    <CardContent sx={{ p: 2 }}>
                                        <Typography variant="subtitle1" fontWeight={700} noWrap>
                                            {item.name}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" sx={{
                                            height: 40,
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {item.description || 'Delicious and freshly prepared.'}
                                        </Typography>
                                        <Button sx={{ mt: 2 }} onClick={() => handleOpenEditDialog(item._id)} variant="outlined" color="primary">
                                            <EditIcon sx={{ mr: 1 }} /> Edit
                                        </Button>
                                        <Button color="error" onClick={() => handleDeleteDish(item._id)} sx={{ mt: 2, ml: 2 }} variant="outlined">
                                            <DeleteIcon sx={{ mr: 1 }} /> Delete
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                        ))
                    ) : (
                        <Box sx={{ width: '100%', textAlign: 'center', py: 10 }}>
                            <FoodIcon sx={{ fontSize: 60, color: '#d1d1d1', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">No items found in your menu.</Typography>
                        </Box>
                    )}
                </Grid>

            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>Add New Dish</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Dish Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={newDish.name}

                        onChange={(e) => { setNewDish({ ...newDish, name: e.target.value }) }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={newDish.description}
                        onChange={(e) => { setNewDish({ ...newDish, description: e.target.value }) }}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={newDish.price}
                        onChange={(e) => { setNewDish({ ...newDish, price: e.target.value }) }}
                    />
                    <TextField
                        margin="dense"
                        label="category"
                        type="text"
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={newDish.category}
                        onChange={(e) => { setNewDish({ ...newDish, category: e.target.value }) }}
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {newDish.image ? 'Change Image' : 'Upload Image'}
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setNewDish({ ...newDish, image: e.target.files[0] })
                            }
                        />
                    </Button>

                    {newDish.image && (
                        <Typography variant="caption" color="success.main">
                            Selected: {newDish.image.name}
                        </Typography>
                    )}


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleAddDish} variant="contained" color="primary">Add Dish</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openEditDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>Edit Dish</DialogTitle>
                <DialogContent>
                    {editDish && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Dish Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={editDish.name}
                                onChange={(e) => setEditDish({ ...editDish, name: e.target.value })}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={editDish.description}
                                onChange={(e) => setEditDish({ ...editDish, description: e.target.value })}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Price"
                                type="text"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={editDish.price}
                                onChange={(e) => setEditDish({ ...editDish, price: e.target.value })}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Category"
                                type="text"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={editDish.category}
                                onChange={(e) => setEditDish({ ...editDish, category: e.target.value })}
                            />
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                {editDish.image ? 'Change Image' : 'Upload Image'}
                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setEditDish({ ...editDish, image: e.target.files[0] })
                                    }
                                />
                            </Button>

                        </>
                    )}


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleSaveEditDish} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
}

export default MenuDashboard;