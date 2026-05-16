"use client";

import { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";

export default function Home() {

  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {

    const fetchJobs = async () => {
      try {
        const response = await API.get(
          `/jobs?category=${category}`
        );
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();

  }, [category]);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">Service Request Board</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage service requests quickly.</p>
          </div>

          <a
            href="/create-job"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
          >
            <span>+</span>
            <span>Create New Job</span>
          </a>
        </header>

        <section>
          <div className="mb-8 flex items-center gap-3">
            <label htmlFor="category" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter by:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg bg-white text-gray-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting</option>
              <option value="Joinery">Joinery</option>
            </select>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500 dark:text-gray-400">No jobs found.</p>
              <p className="text-sm text-gray-400 mt-1">Create a new job to get started</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
