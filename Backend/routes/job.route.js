import express from "express";

import {
  adminJobs,
  createJob,
  getAllJob,
  getJobById,
  updateJob,
} from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, createJob);
router.post("/update/:id", isAuthenticated, updateJob);
router.get("/alljobs", getAllJob);
router.get("/adminjobs", isAuthenticated, adminJobs);
router.get("/get/:id", getJobById);
export default router;
