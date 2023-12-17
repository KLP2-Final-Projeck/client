import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login, putAccessToken } from "../utils/network";
import logoImage from "../assets/logo.png";
import backgroundImage from "../assets/bg.jpeg";
import bg2 from "../assets/hia.jpg";
import Footer from "../pages/Footer/Footer";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    // TODO HANDLE LOGIN HERE
    const response = await login({ username, password });
    if (response?.data?.token) {
      putAccessToken(response.data.token);
      navigate("/HomePage");
    }
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
        <div
          className="container rounded shadow bg-white p-0 d-flex justify-content-around "
          style={{ maxWidth: "800px" }}
        >
          {/* Kanan */}
          <div className="container p-5 rounded">
            <div className="fs-2" style={{ marginTop: "-20px" }}>
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
                <Form.Label className="text-dark fs-4">Username</Form.Label>
                <Form.Control
                  className="py-3"
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </Form.Group>
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
              <Form.Group>
                {username && password ? (
                  <Button
                    className="col-6 btn-outline-success mt-3"
                    variant="light"
                    type="submit"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    className="col-6 btn btn-success p-2 text-light mt-3"
                    type="submit"
                    disabled
                  >
                    Submit
                  </Button>
                )}
              </Form.Group>
              <div className="line"></div>
              <p className="text-secondary text-start mt-3">
                Don't have an account yet?
              </p>
              <Form>
                <Button
                  className="col-3 btn-outline-success"
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
