import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applyJob);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.post("/update/status/:id", isAuthenticated, updateStatus);

export default router;
