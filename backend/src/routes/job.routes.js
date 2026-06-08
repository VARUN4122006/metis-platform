import express from "express";
import multer from "multer";

import {
  createJob,
  getAllJobs,
  getSingleJob,
} from "../controllers/jobController.js";

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
  upload.single("bannerImage"),
  createJob
);

router.get("/all", getAllJobs);

router.get("/:id", getSingleJob);

export default router;