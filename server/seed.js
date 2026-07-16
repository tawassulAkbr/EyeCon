const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const seedData = [
  // --- OPTICAL (Example: Add all 25 items here) ---
  { name: "Classic Blue Frame", price: "Rs. 1000", image: "http://localhost:8000/images/frames/f1.jfif", category: "optical" },
  { name: "Classic Black Frame", price: "Rs. 750", image: "http://localhost:8000/images/frames/f2.jfif", category: "optical" },

  // --- LENSES (Example: Add all 14 items here) ---
  { name: "Amber Ambition", price: "Rs. 1500", image: "http://localhost:8000/images/lens/L1-AmberAmbition.png", category: "lens" },
  { name: "Aquatic Allure", price: "Rs. 1500", image: "http://localhost:8000/images/lens/L2-AquaticAllure.png", category: "lens" },

  // --- SUNGLASSES (Example: Add all items here) ---
  { name: "Ray-Ban Classic", price: "Rs. 2500", image: "http://localhost:8000/images/sunglasses/RB1.png", category: "sunglasses" },
  { name: "Dolce & Gabbana Luxury", price: "Rs. 5000", image: "http://localhost:8000/images/sunglasses/D&B 1.png", category: "sunglasses" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB...");
    await Product.deleteMany({}); // Clears existing collection
    await Product.insertMany(seedData); // Inserts new data
    console.log("Database seeded successfully with port 8000 images!");
    process.exit();
  })
  .catch(err => {
    console.error("Seeding error:", err);
    process.exit(1);
  });