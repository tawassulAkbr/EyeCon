const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data...');

    // Create Admin Account - directly hash password
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@eyecon.pk',
      password: adminPassword,
      role: 'admin',
      addresses: [
        {
          street: 'Office No. 456, Lahore Tech Park',
          city: 'Lahore',
          state: 'Punjab',
          zipCode: '54000',
          country: 'Pakistan',
          isDefault: true,
        }
      ]
    });
    // Skip the pre-save hook
    await User.collection.insertOne(adminUser.toObject());
    console.log('✅ Admin Account Created');
    console.log('   Email: admin@eyecon.pk');
    console.log('   Password: Admin@123');
    console.log('   Role: Admin');

    // Create Regular User Accounts - directly hash passwords
    const userPassword = await bcrypt.hash('User@123', 10);

    const user1Data = {
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@example.pk',
      password: userPassword,
      role: 'user',
      addresses: [
        {
          street: 'House No. 123, Street 15',
          city: 'Karachi',
          state: 'Sindh',
          zipCode: '75500',
          country: 'Pakistan',
          isDefault: true,
        },
        {
          street: 'Apartment 5B, Gulshan Plaza',
          city: 'Karachi',
          state: 'Sindh',
          zipCode: '75600',
          country: 'Pakistan',
          isDefault: false,
        }
      ]
    };
    await User.collection.insertOne(user1Data);
    console.log('\n✅ User Account 1 Created');
    console.log('   Email: ahmed.hassan@example.pk');
    console.log('   Password: User@123');
    console.log('   City: Karachi, Sindh');

    const user2Data = {
      name: 'Fatima Khan',
      email: 'fatima.khan@example.pk',
      password: userPassword,
      role: 'user',
      addresses: [
        {
          street: 'Plot 789, DHA Phase 5',
          city: 'Lahore',
          state: 'Punjab',
          zipCode: '54792',
          country: 'Pakistan',
          isDefault: true,
        }
      ]
    };
    await User.collection.insertOne(user2Data);
    console.log('\n✅ User Account 2 Created');
    console.log('   Email: fatima.khan@example.pk');
    console.log('   Password: User@123');
    console.log('   City: Lahore, Punjab');

    const user3Data = {
      name: 'Ali Raza',
      email: 'ali.raza@example.pk',
      password: userPassword,
      role: 'user',
      addresses: [
        {
          street: 'House 45, Civic Centre',
          city: 'Islamabad',
          state: 'Islamabad Capital Territory',
          zipCode: '44000',
          country: 'Pakistan',
          isDefault: true,
        },
        {
          street: 'Office Suite 201, Blue Area',
          city: 'Islamabad',
          state: 'Islamabad Capital Territory',
          zipCode: '44050',
          country: 'Pakistan',
          isDefault: false,
        }
      ]
    };
    await User.collection.insertOne(user3Data);
    console.log('\n✅ User Account 3 Created');
    console.log('   Email: ali.raza@example.pk');
    console.log('   Password: User@123');
    console.log('   City: Islamabad');

    const user4Data = {
      name: 'Ayesha Malik',
      email: 'ayesha.malik@example.pk',
      password: userPassword,
      role: 'user',
      addresses: [
        {
          street: 'Villa 12, Gulberg III',
          city: 'Lahore',
          state: 'Punjab',
          zipCode: '54660',
          country: 'Pakistan',
          isDefault: true,
        }
      ]
    };
    await User.collection.insertOne(user4Data);
    console.log('\n✅ User Account 4 Created');
    console.log('   Email: ayesha.malik@example.pk');
    console.log('   Password: User@123');
    console.log('   City: Lahore, Punjab');

    // Seed Products with Pakistani pricing
    const opticalProducts = [
      { name: "Classic Blue Frame", price: "Rs. 1,500", image: "http://localhost:8000/images/frames/f1.jfif", category: "optical", description: "Premium lightweight frame with reinforced hinges", stock: 50, published: true, rating: 0, reviews: 0 },
      { name: "Classic Black Frame", price: "Rs. 1,200", image: "http://localhost:8000/images/frames/f2.jfif", category: "optical", description: "Premium lightweight round frame", stock: 45, published: true, rating: 0, reviews: 0 },
      { name: "Classic Brown Frame", price: "Rs. 1,800", image: "http://localhost:8000/images/frames/f3.jfif", category: "optical", description: "Premium metallic brown frame in 3 piece", stock: 30, published: true, rating: 0, reviews: 0 },
      { name: "Ocean White Frame", price: "Rs. 1,500", image: "http://localhost:8000/images/frames/f4.jfif", category: "optical", description: "Premium lightweight frame with nice look", stock: 40, published: true, rating: 0, reviews: 0 },
      { name: "Black Classic Frame", price: "Rs. 800", image: "http://localhost:8000/images/frames/f5.jfif", category: "optical", description: "An old fashioned classic frame with a modern twist", stock: 60, published: true, rating: 0, reviews: 0 },
    ];

    const lensProducts = [
      { name: "Amber Ambition", price: "Rs. 2,000", image: "http://localhost:8000/images/lens/L1-AmberAmbition.png", category: "lens", description: "Warm, golden tones for a bright look", stock: 50, published: true, rating: 0, reviews: 0 },
      { name: "Aquatic Allure", price: "Rs. 2,000", image: "http://localhost:8000/images/lens/L2-AquaticAllure.png", category: "lens", description: "Refreshing deep ocean blue", stock: 45, published: true, rating: 0, reviews: 0 },
      { name: "Blue n Breeze", price: "Rs. 2,000", image: "http://localhost:8000/images/lens/L3-BluenBreeze.png", category: "lens", description: "Light, breezy tones for daily wear", stock: 40, published: true, rating: 0, reviews: 0 },
      { name: "Green", price: "Rs. 1,800", image: "http://localhost:8000/images/lens/L5-Green.png", category: "lens", description: "Vibrant and striking forest green", stock: 35, published: true, rating: 0, reviews: 0 },
    ];

    const sunglassProducts = [
      { name: "Ray-Ban Classic", price: "Rs. 3,500", image: "http://localhost:8000/images/sunglasses/RB1.png", category: "sunglasses", description: "A timeless unisex design offering superior glare protection", stock: 25, published: true, rating: 0, reviews: 0 },
      { name: "Ray-Ban Aviator", price: "Rs. 4,200", image: "http://localhost:8000/images/sunglasses/RB3.png", category: "sunglasses", description: "Classic unisex aviator style", stock: 30, published: true, rating: 0, reviews: 0 },
      { name: "Dolce & Gabbana Luxury", price: "Rs. 7,500", image: "http://localhost:8000/images/sunglasses/D&B 1.png", category: "sunglasses", description: "High-fashion unisex eyewear", stock: 15, published: true, rating: 0, reviews: 0 },
      { name: "Louis Vuitton Prestige", price: "Rs. 11,000", image: "http://localhost:8000/images/sunglasses/LV 1.png", category: "sunglasses", description: "Exquisite unisex sunglasses", stock: 10, published: true, rating: 0, reviews: 0 },
      { name: "Prada Modernist", price: "Rs. 8,500", image: "http://localhost:8000/images/sunglasses/Prada 1.png", category: "sunglasses", description: "Avant-garde unisex frames", stock: 12, published: true, rating: 0, reviews: 0 },
    ];

    const allProducts = [...opticalProducts, ...lensProducts, ...sunglassProducts];
    await Product.insertMany(allProducts);
    console.log('\n✅ Products Seeded');
    console.log(`   Total Products: ${allProducts.length}`);
    console.log(`   Optical Frames: ${opticalProducts.length}`);
    console.log(`   Lenses: ${lensProducts.length}`);
    console.log(`   Sunglasses: ${sunglassProducts.length}`);

    console.log('\n' + '='.repeat(70));
    console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(70));

    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedData();
