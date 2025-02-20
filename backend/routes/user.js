import express from "express";
import protectRoutes from "../middlewares/protectroute.js";
import { getUsersForSidebar } from "../controllers/user_controller.js";

const router=express.Router();

router.get("/" , protectRoutes , getUsersForSidebar);

export default router;