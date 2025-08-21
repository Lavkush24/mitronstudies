import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface LoginFormData {
  name: string;
  password: string;
}

export const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.password) {
      setError("Please enter both name and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);

      navigate("/"); //Smooth redirect to home page
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-[#161B22] p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
