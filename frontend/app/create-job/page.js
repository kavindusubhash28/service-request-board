"use client";

import { useState } from "react";
import API from "../../services/api";

export default function CreateJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", formData);

      alert("Job created successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        contactName: "",
        contactEmail: ""
      });
    } catch (error) {
      console.log(error);
      alert("Error creating job");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            Service Request Board
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Create New Job</h1>
          <p className="mt-2 text-gray-600">
            Fill out the details below to submit a new service request.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-gray-700">
              Title *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter job title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the service request in detail"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="e.g., Plumbing"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="location" className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="Service location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contactName" className="mb-2 block text-sm font-semibold text-gray-700">
                Contact Name
              </label>
              <input
                id="contactName"
                type="text"
                name="contactName"
                placeholder="Your name"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="mb-2 block text-sm font-semibold text-gray-700">
                Contact Email
              </label>
              <input
                id="contactEmail"
                type="email"
                name="contactEmail"
                placeholder="your@email.com"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md mt-6"
          >
            Create Job
          </button>

          <a
            href="/"
            className="block text-center text-sm text-gray-600 mt-3"
          >
            ← Back to Home
          </a>
        </form>
      </div>
    </main>
  );
}