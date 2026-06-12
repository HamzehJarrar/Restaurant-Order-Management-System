import "./src/config/env.js";
import mongoose from "mongoose";
import { MenuModel } from "./database/models/menu.model.js";

const menuItems = [
  // ── Starters ──────────────────────────────────────────────
  {
    name: "Bruschetta",
    price: 18,
    category: "Starters",
    description: "Grilled bread topped with fresh tomatoes, basil, and olive oil.",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80",
  },
  {
    name: "Caesar Salad",
    price: 22,
    category: "Starters",
    description: "Crisp romaine, shaved parmesan, croutons, and classic Caesar dressing.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",
  },
  {
    name: "Greek Salad",
    price: 20,
    category: "Starters",
    description: "Cucumber, tomato, olives, red onion, and feta in herb dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    name: "Garlic Bread",
    price: 16,
    category: "Starters",
    description: "Toasted baguette slices brushed with garlic butter and fresh herbs.",
    image: "https://images.unsplash.com/photo-1619531040576-f9416740661f?w=400&q=80",
  },
  {
    name: "Stuffed Mushrooms",
    price: 26,
    category: "Starters",
    description: "Portobello mushrooms filled with cream cheese, garlic, and herbs.",
    image: "https://images.unsplash.com/photo-1604325708773-6d3b5e27b3c5?w=400&q=80",
  },
  {
    name: "Chicken Wings",
    price: 34,
    category: "Starters",
    description: "Crispy golden wings tossed in BBQ or buffalo sauce.",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
  },
  {
    name: "Mozzarella Sticks",
    price: 28,
    category: "Starters",
    description: "Golden fried mozzarella served with marinara dipping sauce.",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400&q=80",
  },
  {
    name: "Shrimp Cocktail",
    price: 38,
    category: "Starters",
    description: "Chilled tiger shrimp served with zesty cocktail sauce.",
    image: "https://images.unsplash.com/photo-1625943553852-781c4ddded51?w=400&q=80",
  },
  {
    name: "Spring Rolls",
    price: 24,
    category: "Starters",
    description: "Crispy vegetable spring rolls with sweet chili dipping sauce.",
    image: "https://images.unsplash.com/photo-1635350736475-c8cef4b21906?w=400&q=80",
  },
  {
    name: "Soup of the Day",
    price: 20,
    category: "Starters",
    description: "Chef's freshly made soup, served with warm crusty bread.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
  },

  // ── Mains ─────────────────────────────────────────────────
  {
    name: "Margherita Pizza",
    price: 45,
    category: "Mains",
    description: "San Marzano tomato, fresh mozzarella, and basil on thin crust.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
  },
  {
    name: "Pepperoni Pizza",
    price: 52,
    category: "Mains",
    description: "Loaded pepperoni with mozzarella on a classic tomato base.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
  },
  {
    name: "Beef Burger",
    price: 52,
    category: "Mains",
    description: "180g beef patty with lettuce, tomato, pickles, and house sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    name: "Grilled Salmon",
    price: 72,
    category: "Mains",
    description: "Atlantic salmon fillet with lemon butter, capers, and seasonal veg.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80",
  },
  {
    name: "Chicken Alfredo",
    price: 58,
    category: "Mains",
    description: "Grilled chicken breast over fettuccine in creamy Alfredo sauce.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&q=80",
  },
  {
    name: "Ribeye Steak",
    price: 98,
    category: "Mains",
    description: "300g dry-aged ribeye, cooked to your liking, with chimichurri.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",
  },
  {
    name: "BBQ Ribs",
    price: 88,
    category: "Mains",
    description: "Slow-cooked baby back ribs glazed in house BBQ sauce.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
  },
  {
    name: "Grilled Chicken",
    price: 55,
    category: "Mains",
    description: "Herb-marinated chicken breast with roasted potatoes and salad.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80",
  },
  {
    name: "Fish & Chips",
    price: 48,
    category: "Mains",
    description: "Beer-battered cod fillet with thick-cut fries and tartar sauce.",
    image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400&q=80",
  },
  {
    name: "Veggie Bowl",
    price: 42,
    category: "Mains",
    description: "Quinoa, roasted chickpeas, avocado, and tahini dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    name: "Mushroom Risotto",
    price: 48,
    category: "Mains",
    description: "Creamy Arborio risotto with wild mushrooms and truffle oil.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",
  },
  {
    name: "Lamb Chops",
    price: 92,
    category: "Mains",
    description: "Herb-crusted lamb chops with mint jelly and roasted vegetables.",
    image: "https://images.unsplash.com/photo-1602253057119-44d745d9b860?w=400&q=80",
  },

  // ── Sandwiches & Wraps ────────────────────────────────────
  {
    name: "Club Sandwich",
    price: 38,
    category: "Sandwiches",
    description: "Triple-decker with chicken, bacon, egg, lettuce, and tomato.",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=80",
  },
  {
    name: "BLT",
    price: 32,
    category: "Sandwiches",
    description: "Crispy bacon, fresh lettuce, ripe tomato with mayo on sourdough.",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80",
  },
  {
    name: "Chicken Wrap",
    price: 36,
    category: "Sandwiches",
    description: "Grilled chicken, avocado, mixed greens, and garlic aioli in a tortilla.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
  },
  {
    name: "Falafel Wrap",
    price: 30,
    category: "Sandwiches",
    description: "Crispy falafel, hummus, pickled vegetables, and tahini in flatbread.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    name: "Tuna Melt",
    price: 34,
    category: "Sandwiches",
    description: "Tuna salad with cheddar, grilled on sourdough until golden.",
    image: "https://images.unsplash.com/photo-1619881589316-a7be99f6a065?w=400&q=80",
  },

  // ── Sides ─────────────────────────────────────────────────
  {
    name: "French Fries",
    price: 18,
    category: "Sides",
    description: "Golden crispy fries seasoned with sea salt.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
  },
  {
    name: "Sweet Potato Fries",
    price: 22,
    category: "Sides",
    description: "Oven-baked sweet potato fries with chipotle mayo.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80",
  },
  {
    name: "Onion Rings",
    price: 20,
    category: "Sides",
    description: "Beer-battered onion rings with ranch dipping sauce.",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80",
  },
  {
    name: "Coleslaw",
    price: 14,
    category: "Sides",
    description: "Creamy shredded cabbage and carrot slaw.",
    image: "https://images.unsplash.com/photo-1509200927773-a8b9a0063396?w=400&q=80",
  },
  {
    name: "Steamed Rice",
    price: 12,
    category: "Sides",
    description: "Fluffy steamed basmati rice.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
  },
  {
    name: "Mashed Potatoes",
    price: 18,
    category: "Sides",
    description: "Buttery whipped mashed potatoes with chive cream.",
    image: "https://images.unsplash.com/photo-1567590032-2ec5d12e5a25?w=400&q=80",
  },

  // ── Sweets ────────────────────────────────────────────────
  {
    name: "Tiramisu",
    price: 28,
    category: "Sweets",
    description: "Espresso-soaked ladyfingers layered with mascarpone cream.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
  },
  {
    name: "Cheesecake",
    price: 30,
    category: "Sweets",
    description: "New York-style cheesecake on a buttery graham crust.",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=400&q=80",
  },
  {
    name: "Chocolate Lava Cake",
    price: 32,
    category: "Sweets",
    description: "Warm dark chocolate cake with a molten center, served with vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80",
  },
  {
    name: "Fruit Tart",
    price: 26,
    category: "Sweets",
    description: "Buttery pastry shell with vanilla custard and fresh seasonal fruit.",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80",
  },
  {
    name: "Ice Cream Sundae",
    price: 24,
    category: "Sweets",
    description: "Three scoops with chocolate sauce, whipped cream, and a cherry.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
  },
  {
    name: "Crème Brûlée",
    price: 30,
    category: "Sweets",
    description: "Classic French custard with a caramelized sugar crust.",
    image: "https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?w=400&q=80",
  },
  {
    name: "Baklava",
    price: 22,
    category: "Sweets",
    description: "Layers of crispy phyllo, crushed pistachios, and honey syrup.",
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&q=80",
  },
  {
    name: "Waffle",
    price: 30,
    category: "Sweets",
    description: "Belgian waffle with fresh berries, maple syrup, and whipped cream.",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80",
  },
  {
    name: "Chocolate Mousse",
    price: 26,
    category: "Sweets",
    description: "Light and airy dark chocolate mousse with raspberry coulis.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80",
  },
  {
    name: "Kunafa",
    price: 32,
    category: "Sweets",
    description: "Shredded pastry filled with sweet cheese, soaked in rose-scented syrup.",
    image: "https://images.unsplash.com/photo-1683009427513-28b8b9d1e8e9?w=400&q=80",
  },

  // ── Hot Drinks ────────────────────────────────────────────
  {
    name: "Espresso",
    price: 14,
    category: "Hot Drinks",
    description: "Double shot of freshly ground rich espresso.",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80",
  },
  {
    name: "Cappuccino",
    price: 18,
    category: "Hot Drinks",
    description: "Equal parts espresso, steamed milk, and velvety milk foam.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80",
  },
  {
    name: "Latte",
    price: 20,
    category: "Hot Drinks",
    description: "Smooth espresso with steamed milk and a light layer of foam.",
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=80",
  },
  {
    name: "Americano",
    price: 16,
    category: "Hot Drinks",
    description: "Bold espresso diluted with hot water for a smooth, clean taste.",
    image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&q=80",
  },
  {
    name: "Hot Chocolate",
    price: 20,
    category: "Hot Drinks",
    description: "Rich Belgian chocolate blended with steamed milk and whipped cream.",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80",
  },
  {
    name: "Matcha Latte",
    price: 22,
    category: "Hot Drinks",
    description: "Ceremonial-grade matcha whisked with oat milk.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80",
  },
  {
    name: "English Breakfast Tea",
    price: 14,
    category: "Hot Drinks",
    description: "Classic black tea served with milk and sugar.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
  },

  // ── Cold Drinks ───────────────────────────────────────────
  {
    name: "Iced Coffee",
    price: 18,
    category: "Cold Drinks",
    description: "Double espresso over ice with chilled milk.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80",
  },
  {
    name: "Cold Brew",
    price: 22,
    category: "Cold Drinks",
    description: "12-hour cold-steeped coffee, smooth and low-acid.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  },
  {
    name: "Iced Matcha Latte",
    price: 24,
    category: "Cold Drinks",
    description: "Ceremonial matcha shaken with oat milk over ice.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80",
  },
  {
    name: "Lemonade",
    price: 16,
    category: "Cold Drinks",
    description: "Freshly squeezed lemon with cane sugar and mint.",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80",
  },
  {
    name: "Mojito Mocktail",
    price: 24,
    category: "Cold Drinks",
    description: "Fresh mint, lime, cane sugar, and sparkling water.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80",
  },
  {
    name: "Iced Tea",
    price: 16,
    category: "Cold Drinks",
    description: "Chilled black tea lightly sweetened with lemon.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
  },
  {
    name: "Strawberry Milkshake",
    price: 28,
    category: "Cold Drinks",
    description: "Thick shake blended with fresh strawberries and vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
  },
  {
    name: "Chocolate Milkshake",
    price: 28,
    category: "Cold Drinks",
    description: "Rich chocolate ice cream blended with cold milk.",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&q=80",
  },
  {
    name: "Sparkling Water",
    price: 12,
    category: "Cold Drinks",
    description: "Chilled sparkling mineral water.",
    image: "https://images.unsplash.com/photo-1540636024966-75f7d4e0f5a7?w=400&q=80",
  },

  // ── Juices & Smoothies ────────────────────────────────────
  {
    name: "Fresh Orange Juice",
    price: 20,
    category: "Juices",
    description: "Freshly squeezed oranges, served chilled.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
  },
  {
    name: "Watermelon Juice",
    price: 20,
    category: "Juices",
    description: "Pure blended watermelon with a hint of mint.",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&q=80",
  },
  {
    name: "Mango Smoothie",
    price: 26,
    category: "Juices",
    description: "Ripe Alphonso mango blended with yogurt and honey.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80",
  },
  {
    name: "Green Detox Smoothie",
    price: 28,
    category: "Juices",
    description: "Spinach, cucumber, green apple, ginger, and lemon.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80",
  },
  {
    name: "Berry Blast Smoothie",
    price: 28,
    category: "Juices",
    description: "Strawberry, blueberry, raspberry with banana and oat milk.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80",
  },
  {
    name: "Avocado Shake",
    price: 30,
    category: "Juices",
    description: "Creamy avocado blended with milk, honey, and vanilla.",
    image: "https://images.unsplash.com/photo-1638439430466-b2bb7fdc1d67?w=400&q=80",
  },
  {
    name: "Carrot & Ginger Juice",
    price: 22,
    category: "Juices",
    description: "Fresh carrot juice with a kick of ginger and lemon.",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80",
  },
];

const seedMenu = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB. Seeding menu...\n");

  const ops = menuItems.map((item) => ({
    updateOne: {
      filter: { name: item.name },
      update: { $set: item },
      upsert: true,
    },
  }));

  const result = await MenuModel.bulkWrite(ops);
  const total  = await MenuModel.countDocuments();

  console.log(`✓ Seed complete`);
  console.log(`  Inserted : ${result.upsertedCount}`);
  console.log(`  Updated  : ${result.modifiedCount}`);
  console.log(`  Total    : ${total} items in DB`);

  await mongoose.disconnect();
};

seedMenu().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
