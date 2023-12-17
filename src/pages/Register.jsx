import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/network";
import backgroundImage from "../assets/bg.jpeg";

import Footer from "../pages/Footer/Footer";
import logoImage from "../assets/logo.png";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, settelepon] = useState("");

  function onSubmitHandler(event) {
    event.preventDefault();
    // TODO HANDLE REGISTER HERE
    register({ username, password }).then((response) => {
      console.log(response);
      if (response) {
        console.log(response?.code);
        alert("Anda berhasil membuat akun");
        navigate("/");
      }
    });
  }
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div>
          <img src={logoImage} alt="logo" width="220" height="70" />
        </div>
      </nav>
      <div style={backgroundStyle}>
        {}

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
          <Form.Group className="row-md-6 text-start">
            <Form.Label className="text-dark fs-4">Username</Form.Label>
            <Form.Control
              className="py-3"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <Form.Group className="row-md-6 text-start">
              <Form.Label className="text-dark fs-4">Password</Form.Label>
              <Form.Control
                className="py-3"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="row-md-6 text-start">
            <Form.Label className="text-dark fs-4">Email</Form.Label>
            <Form.Control
              className="py-3"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>

          <Form.Group className="row-md-6 text-start">
            <Form.Label className="text-dark fs-4">No Telephone</Form.Label>
            <Form.Control
              className="py-3"
              type="number"
              placeholder="Enter number"
              onChange={(e) => settelepon(e.target.value)}
              value={telepon}
              required
            />
          </Form.Group>
          <Form.Group>
            {username && password ? (
              <Button
                className="col-3 my-5 btn-outline-success"
                variant="light"
                type="submit"
              >
                Register
              </Button>
            ) : (
              <Button
                className="col-3 my-5 btn btn-success p-2 text-light mt-3"
                type="submit"
                disabled
              >
                Register
              </Button>
            )}
          </Form.Group>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
