"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

interface Job {
  _id: string;
  title: string;
  location: string;
  salary: string;
  experience: string;
  company: {
    name: string;
  };
}

export default function DashboardPage() {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
fetchJobs();
}, []);

const fetchJobs = async () => {
try {
const response = await fetch(
"http://localhost:5000/api/job/all"
);


  const data = await response.json();

  if (data.success) {
    setJobs(data.jobs);
  }
} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}


};

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");


window.location.href = "/login";

};

return ( <div className="min-h-screen bg-gray-100"> <div className="bg-black text-white p-5 flex justify-between"> <h1 className="text-2xl font-bold">
AI Recruitment Platform </h1>

<button
      onClick={handleLogout}
      className="bg-red-500 px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>

  <div className="p-8">
    <h2 className="text-3xl font-bold mb-6">
      Dashboard
    </h2>
  <div className="flex gap-4 mb-6">
  <a
    href="/jobs"
    className="bg-black text-white px-4 py-2 rounded"
  >
    Browse Jobs
  </a>

  <a
    href="/applications"
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    My Applications
  </a>
  </div>
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">
          Total Jobs
        </h3>

        <p className="text-3xl font-bold">
          {jobs.length}
        </p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">
          Applications
        </h3>

        <p className="text-3xl font-bold">
          0
        </p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">
          Interviews
        </h3>

        <p className="text-3xl font-bold">
          0
        </p>
      </div>
    </div>

    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        Latest Jobs
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded mb-4"
          >
            <h3 className="text-xl font-bold">
              {job.title}
            </h3>

            <p>
              Company:
              {" "}
              {job.company?.name}
            </p>

            <p>
              Location:
              {" "}
              {job.location}
            </p>

            <p>
              Salary:
              {" "}
              {job.salary}
            </p>

            <a
              href={`/jobs/${job._id}`}
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Job
            </a>
          </div>
        ))
      )}
    </div>
  </div>
</div>


);
}
