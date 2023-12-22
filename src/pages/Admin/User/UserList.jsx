import "../../../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import axios from "axios";
import { BASE_URL } from "../../../utils/network";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`http://${BASE_URL}/user`);
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://${BASE_URL}/user/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavbarAdmin />
      <div className="container columns mt-5">
        <h2 className="mb-5">List Users</h2>
        <button
          className="btn btn-primary d-flex justify-content-start mb-3"
          onClick={() => {
            navigate("/admin/add");
          }}
        >
          Add User
        </button>
        <div className="container d-flex justify-content-around colum">
          <table className="table table-hover">
            <thead className="f-width">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">email</th>
                <th scope="col">Telepon</th>
                <th scope="col">IsAdmin</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.email}</td>
                  <td>{user.telepon}</td>
                  <td>{user.isAdmin}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-danger mb-2"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/admin/edit/${user.id}`}
                      className="btn btn-warning mb-2 bt"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
