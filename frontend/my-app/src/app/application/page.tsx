"use client";

import { useEffect, useState } from "react";

interface Application {
  _id: string;
  status: string;
  matchScore: number;
  job: {
    title: string;
    location: string;
    salary: string;
    experience: string;
  };
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/application/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        My Applications
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border rounded-xl p-6 shadow"
            >
              <h2 className="text-2xl font-bold">
                {app.job.title}
              </h2>

              <p className="mt-2">
                📍 {app.job.location}
              </p>

              <p>
                💰 {app.job.salary}
              </p>

              <p>
                Experience: {app.job.experience}
              </p>

              <p className="mt-3 font-semibold text-blue-600">
                Status: {app.status}
              </p>

              <p className="font-semibold text-green-600">
                Match Score: {app.matchScore}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}