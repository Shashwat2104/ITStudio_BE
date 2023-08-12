import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phonenumber: "",
    hobbies: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cruds-egcs.onrender.com/api/v1/users/single/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setInput(data);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleEditData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://cruds-egcs.onrender.com/api/v1/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error updating data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-500">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">
          Update Information
        </h1>
        <form onSubmit={handleEditData} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="input"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="input"
            />
          </div>
          <div>
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="number"
              name="phonenumber"
              value={input.phonenumber}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="input"
            />
          </div>
          <div>
            <label
              htmlFor="hobbies"
              className="block text-sm font-medium text-gray-700"
            >
              Hobbies
            </label>
            <input
              type="text"
              name="hobbies"
              value={input.hobbies}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="input"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full transform hover:scale-105 transition-transform"
          >
            Update
          </button>
        </form>
        <button
          onClick={() => navigate.push("/")}
          className="btn-secondary mt-2 w-full transform hover:scale-105 transition-transform"
        >
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default Edit;
