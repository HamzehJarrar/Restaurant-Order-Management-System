import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pb: 2, px: 2 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ConfirmDialog;
