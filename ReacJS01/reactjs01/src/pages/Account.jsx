import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userAPI";

function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await userApi.getAccount();
        setUser(res.data);
      } catch (err) {
        setError("Please login first");
      }
    };
    fetchAccount();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Account Information</h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span> {user.username}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {user.role}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Account;
