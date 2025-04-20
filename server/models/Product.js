import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  category: String,
  stock: Number,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
