"use client";

import { useState } from "react";
import axios from "axios";

export default function ResumePage() {
    const [file, setFile] = useState<File | null>(null);
    const [prediction, setPrediction] = useState("");
    const [resumeText, setResumeText] = useState("");

    const handleUpload = async () => {
  try {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/ai/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   console.log(response.data);

if (response.data.success) {
  localStorage.setItem(
    "resumeId",
    response.data.resume._id
  );

  alert("Upload Success");
}   
  } catch (error) {
    console.error(error);
    alert("Upload Failed");
  }
};
    return (
        <div className="p-10">
            <h1 className="text-5xl font-bold mb-10">
                Upload Resume
            </h1>

            <div className="flex gap-5 items-center">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setFile(e.target.files?.[0] || null)
                    }
                />

                <button
                    onClick={handleUpload}
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    Upload
                </button>
            </div>

            {prediction && (
                <div className="mt-10 bg-white shadow-lg rounded-xl p-6 border">
                    <h2 className="text-3xl font-bold mb-4">
                        AI Prediction
                    </h2>

                    <p className="text-xl mb-3">
                        <span className="font-bold">
                            Predicted Role:
                        </span>{" "}
                        {prediction}
                    </p>

                    <div>
                        <h3 className="font-bold text-xl mb-2">
                            Resume Text
                        </h3>

                        <div className="bg-gray-100 p-4 rounded max-h-[300px] overflow-y-scroll">
                            {resumeText}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}