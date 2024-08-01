import express from "express";
import { createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
const router = express.Router();
router.route("/").post(createOrder);
router.route("/myorders/:id").get(getMyOrders);
router.route("/:id").get(getOrderById);
export default router;
