const express = require("express");

const router = express.Router();

const {
	createJob,
	getJobs,
	getJobById,
	updateJobStatus,
	deleteJob
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
router.post("/jobs", createJob);
router.patch("/jobs/:id", updateJobStatus);
router.delete("/jobs/:id", protect, deleteJob);

module.exports = router;
