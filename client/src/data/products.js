// src/data/products.js

// Pre-curated premium high-resolution image links
const opticalImages = [
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80"
];

const sunglassesImages = [
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80"
];

const lensImages = [
  "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1617421770513-81a70425714f?auto=format&fit=crop&w=600&q=80"
];

const faceShapes = ["round", "oval", "square", "heart", "diamond"];
const brands = ["LuxeOptics", "Heritage", "Vanguard", "EyeCon Elite", "BioVision"];

const generateCategoryProducts = (category, count, images) => {
  return Array.from({ length: count }).map((_, i) => {
    const idNum = i + 1;
    const basePrice = category === "lens" ? 40 : 120;
    
    // Distribute AI compatibility tags intelligently
    const shape1 = faceShapes[i % faceShapes.length];
    const shape2 = faceShapes[(i + 1) % faceShapes.length];
    const targetShapes = category === "lens" ? ["all"] : [shape1, shape2];

    return {
      id: `${category.substring(0, 3)}-${idNum}`,
      name: `${brands[i % brands.length]} ${category.toUpperCase()} Model ${100 + idNum}`,
      category: category,
      brand: brands[i % brands.length],
      price: parseFloat((basePrice + (i * 4.50)).toFixed(2)),
      currency: "USD",
      inStock: i % 12 !== 0, // 90%+ inventory status accuracy
      rating: parseFloat((4.2 + (i % 9) * 0.1).toFixed(1)),
      compatibleFaceShapes: targetShapes,
      image: images[i % images.length],
      description: `Premium grade high-performance execution of ${category} wear. Specially optimized for anatomical aesthetics and lasting structural durability.`
    };
  });
};

// Export the complete generated 150-product list
export const products = [
  ...generateCategoryProducts("optical", 50, opticalImages),
  ...generateCategoryProducts("sunglasses", 50, sunglassesImages),
  ...generateCategoryProducts("lens", 50, lensImages)
];