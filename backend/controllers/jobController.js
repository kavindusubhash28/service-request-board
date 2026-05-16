const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {

    const filter = {};

    // filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // keyword search (title, description)
    if (req.query.search) {
      filter.$or = [
        {
          title: {
            $regex: req.query.search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: req.query.search,
            $options: "i"
          }
        }
      ];
    }

    const jobs = await Job.find(filter);

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // check if job exists
    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(job);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// POST /api/jobs
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      contactName,
      contactEmail
    } = req.body;

    // basic validation
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const job = await Job.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const updateJobStatus = async (req, res) => {
  try {

    const { status } = req.body;

    // allowed status values
    const validStatuses = ["Open", "In Progress", "Closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // if no job found
    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(updatedJob);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const deleteJob = async (req, res) => {
  try {

    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    // if no job found
    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJobStatus,
  deleteJob
};
