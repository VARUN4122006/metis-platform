"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.job);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


const handleApply = async () => {
  try {
    const token = localStorage.getItem("token");
    const resumeId = localStorage.getItem("resumeId");

    const response = await fetch(
      "http://localhost:5000/api/application/apply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: id,
          resumeId,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Application Submitted Successfully");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
  if (!job) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        {job.title}
      </h1>

      <p className="mt-4">
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

      <p className="mt-4">
        {job.description}
      </p>
      <button onClick={handleApply}
           className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">
  Apply Now
</button>
    </div>
  );
}