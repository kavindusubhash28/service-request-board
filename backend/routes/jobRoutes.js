const express = require("express");

const router = express.Router();

const {
	createJob,
	getJobs,
	getJobById,
	updateJobStatus
} = require("../controllers/jobController");

router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
router.post("/jobs", createJob);
router.patch("/jobs/:id", updateJobStatus);

module.exports = router;
