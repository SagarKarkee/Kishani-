const productSchema = new mongoose.Schema({
    farmerEmail: { type: String, required: true }, // Email as the unique identifier
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String }, // Optional field for image URL
    dateAdded: { type: Date, default: Date.now },
  });
  
  module.exports = productSchema;
  