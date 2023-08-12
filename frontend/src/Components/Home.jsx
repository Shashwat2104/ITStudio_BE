import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(true);
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
          "https://cruds-egcs.onrender.com/api/v1/users"
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://cruds-egcs.onrender.com/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      if (response.ok) {
        setRender(!render);
        setInput({
          name: "",
          email: "",
          phonenumber: "",
          hobbies: "",
        });
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://cruds-egcs.onrender.com/api/v1/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const newUsers = users.filter((item) => item._id !== id);
        setUsers(newUsers);
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-4/5 max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-blue-600">CRUD</h1>
          <h3 className="text-lg text-gray-600">
            Full-stack internship coding task
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={input.name}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              type="text"
              className="input"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              type="email"
              className="input"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="phonenumber" className="block text-gray-700">
              Phone Number
            </label>
            <input
              id="phonenumber"
              name="phonenumber"
              value={input.phonenumber}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              type="number"
              className="input"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="hobbies" className="block text-gray-700">
              Hobbies
            </label>
            <input
              id="hobbies"
              name="hobbies"
              value={input.hobbies}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              type="text"
              className="input"
              placeholder="Enter your hobbies"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn-primary w-full transform hover:scale-105 transition-transform bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
        </form>
        <div className="mt-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone Number</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Hobbies</th>
                <th className="py-2 px-4">Edit</th>
                <th className="py-2 px-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id} className="border-t border-gray-300">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.phonenumber}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.hobbies}</td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/edit/${user._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Update
                      </Link>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
