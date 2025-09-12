import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userAPI";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userApi.register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Register</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-green-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}

export default Register;
