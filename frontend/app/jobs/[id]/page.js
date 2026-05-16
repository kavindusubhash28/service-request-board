"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "../../../services/api";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.log(error);
        setJob(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleStatusChange = async (e) => {
    try {
      const response = await API.patch(`/jobs/${id}`, {
        status: e.target.value
      });

      setJob(response.data);
    } catch (error) {
      console.log(error);
      alert("Error updating job status");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/jobs/${id}`);
      alert("Job deleted successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Error deleting job");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-10 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading job details...</p>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/")}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <button
          onClick={() => router.push("/")}
          className="mb-6 text-sm font-semibold text-blue-600"
        >
          ← Back to Home
        </button>

        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            Job Details
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-3 text-gray-600">{job.description}</p>
        </div>

        <div className="grid gap-4 rounded-xl bg-blue-50 p-5 text-sm text-gray-700 sm:grid-cols-2 mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Category</p>
            <p className="text-gray-900 font-medium">{job.category || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Location</p>
            <p className="text-gray-900 font-medium">{job.location || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Contact Name</p>
            <p className="text-gray-900 font-medium">{job.contactName || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Contact Email</p>
            <p className="text-gray-900 font-medium">{job.contactEmail || "-"}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={job.status}
              onChange={handleStatusChange}
              className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-medium"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md"
          >
            Delete Job
          </button>
        </div>
      </div>
    </main>
  );
}
