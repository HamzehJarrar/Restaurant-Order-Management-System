import { Box } from "@mui/material"
import TopBar from "./components/TopBar"
import SideBar from "./components/SideBar"
import MenuGrid from "./components/MenuGrid"
import OrderSummary from "./components/OrderSummary"
import { useState } from "react"

export default function POSPage() {
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Poached Egg", price: 40, quantity: 2, size: "large", image: "/poached-egg.jpg" },
    { id: 2, name: "Cortado", price: 17, quantity: 2, size: "large", image: "/cortado-coffee.jpg" },
    { id: 3, name: "Coronation", price: 20, quantity: 2, size: "large", image: "/coronation-sandwich.jpg" },
  ])

  const addToOrder = (item) => {
    const existing = orderItems.find((i) => i.id === item.id)
    if (existing) {
      setOrderItems(orderItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }])
    }
  }

  const updateQuantity = (id, delta) => {
    setOrderItems(
      orderItems
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id))
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#fafafa" }}>
      <TopBar />
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <SideBar />
        <MenuGrid onAddToOrder={addToOrder} />
        <OrderSummary items={orderItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />
      </Box>
    </Box>
  )
}
