import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login, putAccessToken } from "../utils/network";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer"
import bg2 from "../assets/hia.jpg";
import '../App.css';
import Swal from 'sweetalert2'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitHandler(event) {
    event.preventDefault();
  
    try {
      const response = await login({ username, password });
      console.log(response);
  
      if (response?.data?.token) {
        putAccessToken(response.data.token);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Berhasil Login!",
          showConfirmButton: false,
        }).then(() => setTimeout[2000] ,navigate('/homePage'));
      } else {
        throw new Error("Username atau password Anda salah. Silakan coba lagi.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username atau Password Anda Salah!",
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className="Atas backgroundStyle">
        <div
          className="container rounded shadow bg-white p-0 d-flex justify-content-around "
          style={{ maxWidth: "800px" }}
        >
          {/* Kanan */}
          <div className="container p-5 rounded border border-start-0">
            <div className="fs-3" style={{ marginTop: "-20px" }}>
              <strong>Please Log in</strong>
            </div>
            <Form
              onSubmit={(event) => {
                onSubmitHandler(event);
              }}
            >
              <Form.Group
                className="row-md-6 text-start"
                style={{ marginTop: "25px" }}
              >
                <Form.Label className="text-dark fs-5">Username</Form.Label>
                <Form.Control
                  className="py-2 fs-6"
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="row-md-6 text-start">
                <Form.Label className="text-dark fs-5 mt-2">Password</Form.Label>
                <Form.Control
                  className="py-2 fs-6"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>
              <Form.Group>
                {username && password ? (
                  <Button
                    className="col-12 btn-outline-success mt-4"
                    variant="light"
                    type="submit"
                  >
                    Log In
                  </Button>
                ) : (
                  <Button
                    className="col-12 btn btn-success text-light mt-4"
                    type="submit"
                    disabled
                  >
                    Log In
                  </Button>
                )}
              </Form.Group>
              <div className="line"></div>
              <p className="text-secondary text-start mt-3">
                Don't have an account yet?
              </p>
              <Form>
                <Button
                  className="col-12 btn-outline-success"
                  variant="light"
                  type="submit"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </Form>
            </Form>
          </div>

          {/* Kiri */}
          <div className="container rounded p-0">
            <img src={bg2} width={"137%"} className="rounded shadow" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
