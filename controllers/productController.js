import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    category,
    price,
    discountPrice,
    onHomepage,
    inStock,
  } = req.body;
  const product = new Product({
    name: name,
    image: image,
    description: description,
    category: category,
    price: price,
    discountPrice: discountPrice,
    onHomepage: onHomepage,
    inStock: inStock,
  });
  const eventEmmiter = req.app.get("eventEmmiter");
  const createdProduct = await product.save();
  eventEmmiter.emit("productAdded", { product: createdProduct });
  res.status(201).json(createdProduct);
});
export { getProducts, getProductById, createProduct };
