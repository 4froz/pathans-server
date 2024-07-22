import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(bodyParser.json());
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow access from all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});


app.use(cors({
  origin: "*", // Allows all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
connectDb();
app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5000;




httpServer.listen(5000, '0.0.0.0', () => {
  console.log("Server is running on port 3000");
});