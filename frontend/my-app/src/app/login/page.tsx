"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

     console.log("STATUS:", response.status);
console.log("LOGIN RESPONSE:", data);
      if (response.ok) {
        // Save token
        localStorage.setItem(
          "token",
          data.token
        );

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Success");

        // Redirect by role
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Recruitment Platform
        </h1>

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
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}