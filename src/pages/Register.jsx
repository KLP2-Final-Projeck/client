import '../App.css';
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/network";
import Navbar from "./Navbar";
const Swal = require('sweetalert2');

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  function onSubmitHandler(event) {
    event.preventDefault();
    // TODO HANDLE REGISTER HERE
    register({ username, password, email }).then((response) => {
      console.log(response);
      if (response.code == 200) {
        Swal.fire("Berhasil Membuat Akun!").then(() => {
          console.log(response?.code);
          setTimeout(() => navigate("/login"), 1000);
        });
      } else if (response.code == 404) {
        Swal.fire('Email atau Username Sudah Tersedia!')
      }
    });
  }

  function validateForm() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');

    const password = passwordInput.value;

    if (password.length < 4) {
      passwordError.textContent = '* Password Harus Lebih Dari 3 karakter.';
      passwordInput.focus(); 
    } else {
      passwordError.textContent = '';
    }
  }

  return (
    <>
      <Navbar />
      <div className="backgroundStyle">
        { }
        <strong
          className="fs-1 text-center text-light"
          style={{ marginTop: "110px" }}
        >
          Sign Up
        </strong>
        <Form
          className="row px-5 col-md-4 g-3 m-5 text-light card mx-auto"
          onSubmit={(event) => {
            onSubmitHandler(event);
          }}
        >
          <Form.Group className="row-md-6 text-start pt-3">
            <Form.Label className="text-dark fs-5">Email</Form.Label>
            <Form.Control
              className="py-2 fs-6"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="row-md-6 text-start">
            <Form.Label className="text-dark fs-5">Username</Form.Label>
            <Form.Control
              className="py-2 fs-6"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </Form.Group>
          <Form.Group className="row-md-6 text-start">
            <Form.Label className="text-dark fs-5">Password</Form.Label>
            <Form.Control
              id="password"
              className="py-2 fs-6"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div id="passwordError" className="error-message text-warning ukuran pt-3"></div>
          </Form.Group>
          <Form.Group className="row-md-6 text-start">
            <Form.Label className="text-dark fs-5">Confirm Password</Form.Label>
            <Form.Control
              className="py-2 fs-6"
              type="password"
              placeholder="Enter password"
            // onChange={(e) => setconfirmPassword(e.target.value)}
            // value={confirmPassword}
            // required
            />
          </Form.Group>
          <Form.Group>
            {username && password ? (
              <Button
                className="col-12 mt-3 btn-outline-success p-2"
                variant="light"
                type="submit"
                onClick={validateForm()}
              >
                Register
              </Button>
            ) : (
              <Button
                className="col-12 mt-3 btn btn-success p-2 text-light"
                type="submit"
                disabled
              >
                Register
              </Button>
            )}
          </Form.Group>
          <div className="line"></div>
          <Form>
            <p className="text-secondary text-start">
              Do you have an account?
            </p>
            <Button
              className="col-12 btn-outline-success mb-5"
              variant="light"
              type="submit"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Form>
        </Form>
      </div>
    </>
  );
}

export default Register;
