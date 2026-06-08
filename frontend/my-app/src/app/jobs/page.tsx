"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/job/all")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1 className="p-8">Loading Jobs...</h1>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Available Jobs
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-xl p-5 shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              {job.title}
            </h2>

            <p>
              <strong>Company:</strong>{" "}
              {job.company?.name}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {job.location}
            </p>

            <p>
              <strong>Salary:</strong>{" "}
              {job.salary}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {job.experience}
            </p>

            <Link href={`/jobs/${job._id}`}>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}