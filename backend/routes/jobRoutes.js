const express = require("express");

const router = express.Router();

const { createJob, getJobs } = require("../controllers/jobController");

router.get("/jobs", getJobs);
router.post("/jobs", createJob);

module.exports = router;
