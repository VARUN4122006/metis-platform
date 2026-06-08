import express from "express";

import {
  applyJob,
  getMyApplications,
  getAllApplications,
} from "../controllers/application.controller.js";

import {
  protect,
  adminOnly,
} from "../middleware/auth.js";

const router = express.Router();

// Candidate Apply Job
router.post(
  "/apply",
  protect,
  applyJob
);

// Candidate Dashboard
router.get(
  "/my-applications",
  protect,
  getMyApplications
);

// Admin Dashboard
router.get(
  "/all",
  protect,
  adminOnly,
  getAllApplications
);

export default router;