import express from "express";
import { verifieToken } from "../middlewares/auth.js";
import {
  signup,
  sign,
  getUsers,
  getUserbyID,
  deleteUser,
  updateUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/sign", sign);
router.get("/get", getUsers);
router.get("/get/:id", getUserbyID);
router.delete("/delete/:id",  deleteUser);
router.put("/update/:id",  updateUser);

export default router;
