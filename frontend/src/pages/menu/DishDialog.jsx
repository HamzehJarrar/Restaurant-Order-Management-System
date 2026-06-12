import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Box, Typography, IconButton
} from "@mui/material";
import { CloudUpload as UploadIcon, Close as CloseIcon } from "@mui/icons-material";

function DishDialog({ open, onClose, title, dish, setDish, onSubmit, submitText }) {
    const imageSrc =
        dish?.image instanceof File
            ? URL.createObjectURL(dish.image)
            : dish?.image;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h6" fontWeight={700}>{title}</Typography>
                <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <TextField
                    fullWidth
                    label="Dish Name"
                    sx={{ mb: 2 }}
                    value={dish?.name || ""}
                    onChange={(e) => setDish({ ...dish, name: e.target.value })}
                />
                <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                    value={dish?.description || ""}
                    onChange={(e) => setDish({ ...dish, description: e.target.value })}
                />
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Price ($)"
                        type="number"
                        sx={{ flex: 1 }}
                        value={dish?.price || ""}
                        onChange={(e) => setDish({ ...dish, price: e.target.value })}
                    />
                    <TextField
                        label="Category"
                        sx={{ flex: 1 }}
                        value={dish?.category || ""}
                        onChange={(e) => setDish({ ...dish, category: e.target.value })}
                    />
                </Box>

                <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    startIcon={<UploadIcon />}
                    sx={{ borderStyle: 'dashed', py: 1.5 }}
                >
                    {dish?.image ? 'Change Image' : 'Upload Image'}
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => setDish({ ...dish, image: e.target.files[0] })}
                    />
                </Button>

                {imageSrc && (
                    <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(148,163,184,0.2)' }}>
                        <img
                            src={imageSrc}
                            alt="Preview"
                            style={{ width: '100%', maxHeight: 200, objectFit: 'cover', display: 'block' }}
                        />
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button onClick={onClose} variant="outlined" sx={{ flex: 1 }}>Cancel</Button>
                <Button variant="contained" color="secondary" onClick={onSubmit} sx={{ flex: 1 }}>
                    {submitText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DishDialog;
