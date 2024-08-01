import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import connectDb from "./functions/config/db.js";
import userRoutes from "./functions/routes/userRoutes.js";
import productRoute from "./functions/routes/productRoute.js";
import orderRoute from "./functions/routes/orderRoute.js";
import paymentRoute from "./functions/routes/paymentRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(bodyParser.json());
const httpServer = createServer(app);

app.use(cors());

connectDb();
app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);

const PORT = process.env.PORT || 5000;

app.listen(8080, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
