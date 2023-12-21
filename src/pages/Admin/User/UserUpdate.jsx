import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserUpdate = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const {id} = useParams();

  useEffect(() =>{
    getUserbyId();
  },[]);

  const Navigate = useNavigate();

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4002/user/${id}`, {
        username,
        password,
        email,
        telepon,
        isAdmin,
      });
      Navigate('/admin/user')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getUserbyId = async () => {
    const response = await axios.get(`http://localhost:4002/user/${id}`);
    setUsername(response.data.username);
    setPassword(response.data.password);
    setEmail(response.data.email);
    setTelepon(response.data.telepon);
    setIsAdmin(response.data.isAdmin);
  }

  return (
    <>
      <NavbarAdmin />
      <h1>Update Users</h1>
      <Form className='container mb-5' onSubmit={updateUser}>
        <Form.Group className="mb-4" controlId="formUsername">
          <Form.Label className='d-flex justify-content-start'>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label className='d-flex justify-content-start'>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formEmail">
          <Form.Label className='d-flex justify-content-start'>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formTelepon">
          <Form.Label className='d-flex justify-content-start'>Telepon</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Masukkan telepon"
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formIsAdmin">
          <Form.Label className='d-flex justify-content-start'>isAdmin</Form.Label>
          <Form.Select
            value={isAdmin.toString()}
            onChange={(e) => setIsAdmin(JSON.parse(e.target.value))}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </Form.Select>
        </Form.Group>

        <Button className='me-3' onClick={(() => Swal.fire('Berhasil Menambahkan Update!').then(() => { Navigate('/admin/user') }))} variant="primary" type="submit">
          Update
        </Button>
        <Button className='' onClick={() => Navigate('/admin/user')} variant="success" type="submit">
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default UserUpdate;
