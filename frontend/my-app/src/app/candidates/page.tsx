"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState<any[]>([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    // FETCH
    const fetchCandidates = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/candidates"
            );

            setCandidates(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    // ADD
    const addCandidate = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/candidates",
                {
                    name,
                    email,
                    role,
                }
            );

            setName("");
            setEmail("");
            setRole("");

            fetchCandidates();
        } catch (error) {
            console.log(error);
        }
    };

    // DELETE
    const deleteCandidate = async (id: string) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/candidates/${id}`
            );

            fetchCandidates();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-4xl mx-auto">

                {/* FORM */}
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold mb-6">
                        Add Candidate
                    </h1>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Candidate Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-4 rounded-lg"
                        />

                        <input
                            type="email"
                            placeholder="Candidate Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-4 rounded-lg"
                        />

                        <input
                            type="text"
                            placeholder="Applied Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border p-4 rounded-lg"
                        />

                        <button
                            onClick={addCandidate}
                            className="bg-black text-white px-6 py-3 rounded-lg w-full"
                        >
                            Add Candidate
                        </button>
                    </div>
                </div>

                {/* LIST */}
                <div className="bg-white p-8 rounded-xl shadow-md mt-10">
                    <h2 className="text-3xl font-bold mb-6">
                        Candidates
                    </h2>

                    <div className="space-y-4">
                        {candidates.map((candidate) => (
                            <div
                                key={candidate._id}
                                className="border p-5 rounded-xl flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-2xl font-semibold">
                                        {candidate.name}
                                    </h3>

                                    <p>{candidate.email}</p>

                                    <p className="text-gray-600">
                                        {candidate.role}
                                    </p>

                                    <span className="inline-block mt-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                                        {candidate.status}
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        deleteCandidate(candidate._id)
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}