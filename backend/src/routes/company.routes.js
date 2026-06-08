import express from "express";
import multer from "multer";

import {
  createCompany,
  getCompanies,
} from "../controllers/company.controller.js";

import {
  protect,
  adminOnly,
} from "../middleware/auth.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post(
  "/create",
  protect,
  adminOnly,
  upload.single("logo"),
  createCompany
);

router.get(
  "/all",
  getCompanies
);

export default router;