import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get("http://localhost:5000/api/admin/all-users", {
        headers: { Authorization: "Bearer " + token },
      });
      setUsers(data.users);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        fetchUsers();
      } catch (err) {
        console.log(err);
        alert("Failed to delete user");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="manage-products-container">
      <h1>Manage Users</h1>

   <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {users.map((u) => (
      <tr key={u._id}>
        <td data-label="Name">{u.name}</td>
        <td data-label="Email">{u.email}</td>
        <td data-label="Role">{u.role}</td>

        <td data-label="Actions">
          <Link to={`/admin/users/edit/${u._id}`} className="edit-btn">
            Edit
            <Toaster/>
          </Link>

          <button
            onClick={() => deleteUser(u._id)}
            className="delete-btn"
          >
            Delete
            <Toaster/>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default ManageUsers;
