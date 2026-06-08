"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
  name: fullName,
  email,
  password,
})
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Registration Failed");
  }
};
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
}