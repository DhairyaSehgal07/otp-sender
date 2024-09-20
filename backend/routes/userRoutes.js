import express from "express";
import {
  createUser,
  getUsers,
  getSingleUser,
  sendOtp,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/:id/send-otp", sendOtp);

export default router;
