import { Box, Typography, Divider } from "@mui/material";
import { getOrderByTable, updateOrder } from "../../../api/order.api"
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';

const TableSummary = ({ table }) => {
  const [order, setOrder] = useState(null);
  const now = new Date();

  useEffect(() => {
    if (!table?.currentOrder) return;

    const fetchOrder = async () => {
      const data = await getOrderByTable(table._id);
      setOrder(data);
    };

    fetchOrder();
  }, [table]);

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = order.items.map((orderItem) =>
      orderItem._id === item._id ? { ...orderItem, quantity: newQuantity } : orderItem
    );
    const updatedOrder = await updateOrder(order._id, { items: updatedItems });
    setOrder(updatedOrder);
  };

  const removeItem = async (itemId) => {
    const updatedItems = order.items.filter(
      (item) => item._id !== itemId
    );

    const updatedOrder = await updateOrder(order._id, {
      items: updatedItems,
    });

    setOrder(updatedOrder);
  };


  return (
    <Box p={2} border="1px solid #ccc" borderRadius={2} width={400} bgcolor={"white"} >
      <Typography variant="h6">
        {now.toLocaleTimeString()}
      </Typography>
      <Divider />
      <Typography variant="h6" color="#E64A19" mt={1} mb={1}>Table {table.number}</Typography>
      <Divider />
      {order ? (
        <Box mt={2} gap={1} display="flex" flexDirection="column">

          {order.items.map((item, index) => (
            <Box
              key={index}
              mb={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* Image */}
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 12,
                  objectFit: "cover",
                  borderRadius: 4
                }}
              />

              {/* Name & Price */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>

                  {/* Total */}
                  <Typography variant="h6" fontWeight="bold" color="#F6521F">
                    ${item.quantity * item.price}
                  </Typography>
                </Box>

                <Box sx={{
                  display: "flex",
                  alignItems: "center",


                }}>
                  <Typography variant="h6" color="#F6521F">
                    ${item.price}
                  </Typography>
                  {/* Quantity Controls */}
                  <Box display="flex" alignItems="center" ml={2} sx={{

                  }}>
                    <Box
                      component="button"
                      onClick={() => updateQuantity(item, item.quantity - 1)}

                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 5,
                        border: "2px solid #D2D6D9",
                        color: "#000000ff",
                        background: "none",
                        cursor: "pointer",
                        fontSize: 20,
                      }}
                    >
                      -
                    </Box>
                    <Typography variant="h6" mx={1} sx={{
                      bgcolor: "#E5E7EB",
                      width: 40,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: .5
                    }}>
                      {item.quantity}
                    </Typography>
                    <Box
                      component="button"
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 5,
                        border: "2px solid #D2D6D9",
                        color: "#000000ff",
                        background: "none",
                        cursor: "pointer",
                        fontSize: 20,
                        marginRight: 8,
                      }}
                    >
                      +
                    </Box>
                  </Box>

                  <Box
                    component="button"
                    onClick={() => removeItem(item._id)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: "none",
                      backgroundColor: "#FF5252",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 14,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                    }}
                  >
                    <DeleteIcon style={{ fontSize: 16 }} />
                  </Box>



                </Box>




              </Box>
            </Box>


          ))}
          <Divider />
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" >
                Total
              </Typography>
              <Typography variant="body1" color="textSecondary">
                items : {order.items.reduce((total, item) => total + item.quantity, 0)}
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="bold" color="#F6521F">
              ${order.items.reduce((total, item) => total + item.price * item.quantity, 0)}
            </Typography>
          </Box>

          <Button variant="contained" style={{ backgroundColor: "#1BA672" }} fullWidth sx={{ mt: 2 }}>
            <WalletIcon sx={{ mr: 1 }} />
            Checkout
          </Button>

        </Box>
      ) : (
        <Typography mt={2}>No current order for this table.</Typography>
      )}
    </Box>
  );
};


export default TableSummary;
