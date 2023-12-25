import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getUserLogged, getNotes } from "../utils/network";
import axios from "axios";

function Profile() {
  const [profil, setProfil] = useState({ data: {} });
  const [setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('id');

    if (username, id) {
      setUsername(username);
      setId(id);
    }
  }, []);

  return (
    <div className="px-5 mx-5">
      <strong className="fs-1 text-center ">Profile</strong>
      <Form className="row g-3 m-5">
        <Form.Group className="col-md-12 text-start">
          <Form.Label>User Id</Form.Label>
          <Form.Control type="text" value={id} disabled />
        </Form.Group>
        <Form.Group className="col-md-12 text-start">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} disabled />
        </Form.Group>
        <Form.Group className="col-md-12 text-start">
          <Form.Label>Join On</Form.Label>
          <Form.Control
            type="text"
            disabled
          />
        </Form.Group>
        <Button
          className="col-2 btn-outline-success position-relative start-50 translate-middle-x"
          variant="light"
          type="submit"
          onClick={() => {
            navigate(`/HomePage`);
          }}
        >
          OK
        </Button>
      </Form>
    </div>
  );
}

export default Profile;
