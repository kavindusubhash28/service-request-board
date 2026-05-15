const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    location: String,
    contactName: String,
    contactEmail: {
      type: String,
      match: /.+\@.+\..+/ // email validation
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
