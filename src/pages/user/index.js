
import { useUserContext } from "@/pages/context/UserContext";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function UserList() {
  const { users, setUsers } = useUserContext();
  const [editId, setEditId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", email: "", phone: "" });

  
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users)) 
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

 
  const handleEditClick = (user) => {
    setEditId(user.id);
    setEditedUser({ name: user.firstName, email: user.email, phone: user.phone });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...editedUser } : user)));
    setEditId(null);
  };

  // Handle Delete
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <Head>
        <title>User List</title>
        <meta name="description" content="Manage your users with ease. Edit, delete, and view user details in a structured table format." />
        <meta name="keywords" content="User List, User Management, Edit Users, Delete Users" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="User List - Manage Users" />
        <meta property="og:description" content="A simple and efficient user management system built with Next.js and Tailwind CSS." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/user-list" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="User List - Manage Users" />
        <meta name="twitter:description" content="A simple and efficient user management system built with Next.js and Tailwind CSS." />
        <meta name="twitter:image" content="/path-to-image.jpg" />
      </Head>

      <div className="flex flex-col items-center min-h-screen justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          {users.length === 0 ? (
            <p className="text-center">No users available</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Phone</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="text-center border-b">
                    <td className="border border-gray-300 p-2">
                      {editId === user.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editedUser.name}
                          onChange={handleInputChange}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        user.firstName
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {editId === user.id ? (
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleInputChange}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {editId === user.id ? (
                        <input
                          type="text"
                          name="phone"
                          value={editedUser.phone}
                          onChange={handleInputChange}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td className="border border-gray-300 p-2 space-x-2">
                      {editId === user.id ? (
                        <button onClick={() => handleSave(user.id)} className="text-green-500">
                          Save
                        </button>
                      ) : (
                        <button onClick={() => handleEditClick(user)} className="text-blue-500">
                          Edit
                        </button>
                      )}
                      <button onClick={() => handleDelete(user.id)} className="text-red-500">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
