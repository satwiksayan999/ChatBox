import express from "express";
import protectRoutes from "../middlewares/protectroute.js"
import { sendmessage } from "../controllers/message_controller.js";
import { getmessage } from "../controllers/message_controller.js";

const router=express.Router();

router.get("/:id" , protectRoutes , getmessage)
router.post("/send/:id" , protectRoutes , sendmessage);

export default router;