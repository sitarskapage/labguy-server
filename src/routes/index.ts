// routes.js
import { Router } from "express";
import usersRoutes from "./indexRoutes/users";

// New Router instance
const router = Router();

// /api/

router.use("/users", usersRoutes);

export default router;
