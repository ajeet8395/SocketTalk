import express from "express";
import {
  getAllUsers,
  login,
  logout,
  signup,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, getAllUsers);

export default router;