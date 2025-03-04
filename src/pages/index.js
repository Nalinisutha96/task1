import { useState, useEffect } from "react";
import { useUserContext } from "@/pages/context/UserContext";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const { users, setUsers, editingUser, setEditingUser } = useUserContext();
  const router = useRouter();

  // State for form inputs
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // Pre-fill form if editing
  useEffect(() => {
    if (editingUser) setFormData(editingUser);
  }, [editingUser]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save or update user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => (user.email === editingUser.email ? formData : user)));
      setEditingUser(null);
    } else {
      setUsers([...users, formData]);
    }
    setFormData({ name: "", email: "", phone: "" });
    router.push("/user");
  };

  return (
    <>
    <Head>
    <title>{editingUser ? "Edit User - User Management" : "Add User - User Management"}</title>
    <meta name="description" content="Manage users by adding, editing, or updating user information." />
    <meta name="keywords" content="User Management, Add User, Edit User, Next.js, React" />
    <meta name="author" content="Your Name" />
    <meta property="og:title" content={editingUser ? "Edit User" : "Add User"} />
    <meta property="og:description" content="Easily add or update user details in this simple user management system." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yourwebsite.com" />
    <meta property="og:image" content="https://yourwebsite.com/thumbnail.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
    <div className="flex flex-col items-center min-h-screen justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">{editingUser ? "Edit User" : "Add User"}</h1>
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">{editingUser ? "Update" : "Save"}</button>
      </form>
    </div>
    </>
  );
}
