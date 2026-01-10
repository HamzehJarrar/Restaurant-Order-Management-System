import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Box
} from "@mui/material";

function DishDialog({
    open,
    onClose,
    title,
    dish,
    setDish,
    onSubmit,
    submitText
}) {
    const imageSrc =
        dish?.image instanceof File
            ? URL.createObjectURL(dish.image)
            : dish?.image;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
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
                    sx={{ mb: 2 }}
                    value={dish?.description || ""}
                    onChange={(e) => setDish({ ...dish, description: e.target.value })}
                />

                <TextField
                    fullWidth
                    label="Price"
                    sx={{ mb: 2 }}
                    value={dish?.price || 0}
                    onChange={(e) => setDish({ ...dish, price: e.target.value })}
                />

                <TextField
                    fullWidth
                    label="Category"
                    sx={{ mb: 2 }}
                    value={dish?.category || ""}
                    onChange={(e) => setDish({ ...dish, category: e.target.value })}
                />

                <Button component="label" variant="outlined" fullWidth>
                    Upload Image
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setDish({ ...dish, image: e.target.files[0] })
                        }
                    />
                </Button>

                {imageSrc && (
                    <Box sx={{ mt: 2 }}>
                        <img
                            src={imageSrc}
                            alt="Preview"
                            style={{
                                maxWidth: "100%",
                                maxHeight: 200,
                                borderRadius: 8,
                                objectFit: "cover"
                            }}
                        />
                    </Box>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={onSubmit}>
                    {submitText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DishDialog;
