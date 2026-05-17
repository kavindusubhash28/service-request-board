"use client";

import { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";

export default function Home() {

  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);

    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  useEffect(() => {

    const fetchJobs = async () => {
      try {
        // build query params
        const params = [];
        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (search) params.push(`search=${encodeURIComponent(search)}`);
        const query = params.length ? `?${params.join("&")}` : "";

        const response = await API.get(`/jobs${query}`);
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();

  }, [category, search]);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between mb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">Service Request Board</h1>
              <p className="text-gray-600 dark:text-gray-400">Track and manage service requests quickly.</p>
            </div>

            <div className="flex items-center gap-3 sm:justify-end">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    alert("Logged out");
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <a
                    href="/register"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Register
                  </a>

                  <a
                    href="/login"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Login
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="mb-6">
            <a
              href="/create-job"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              <span>+</span>
              <span>Create New Job</span>
            </a>
          </div>
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

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="ml-3 w-80 max-w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
