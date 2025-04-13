import express from "express";
import { createCheckoutSession, getAllPurchasedCourse, getCouruseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.contoller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.eat({ type: "application/json" }), stripeWebhook)
router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCouruseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router