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
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Service Request Board</h1>

          <a
            href="/create-job"
            className="bg-black text-white px-6 py-3 rounded-lg inline-block mb-6 mt-4"
          >
            + Create New Job
          </a>

          <p className="mt-2 text-gray-600 dark:text-gray-300">Track and manage service requests quickly.</p>
        </header>

        <section>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg mb-6"
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>

          {jobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs found.</p>
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
