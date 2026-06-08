import express from "express";
import upload from "../middleware/upload.js";

import {
    createCandidate,
    getCandidates,
    deleteCandidate,
} from "../controllers/candidatecontroller.js";

const router = express.Router();

router.post(
    "/",
    upload.single("resume"),
    createCandidate
);

router.get("/", getCandidates);

router.delete("/:id", deleteCandidate);

export default router;