"use client";

import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const fetchJobs = async () => {
      try {
        const response = await API.get("/jobs");
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();

  }, []);

  return (
    <div>
      <h1>Service Request Board</h1>

      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
