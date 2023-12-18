import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import user from "../assets/user.png";
import logout from "../assets/logout.png";

function Navbar() {
  const navigate = useNavigate();

  const onProfileHandler = (event) => {
    event.preventDefault();
    navigate("/profile");
  };

  const onLogoutHandler = (event) => {
    event.preventDefault();
    navigate("/logout");
  };

  const onDonasiHandler = (event) => {
    event.preventDefault();
    navigate("/donasi");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div>
        <img src={logoImage} alt="logo" width="220" height="70" />
      </div>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className=" justify-content-end flex-grow-1 pe-3 collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav d-flex justify-content-center fs-4">
            <li className="nav-item">
              <Link to="/HomePage" className="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Petisi" className="nav-link">
                Petisi
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Article" className="nav-link">
                Artikel
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Forum" className="nav-link">
                Forum
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/donasi" className="nav-link" onClick={onDonasiHandler}>
                Donasi
              </Link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <button
              class="btn btn-light"
              type="submit"
              onClick={() => {
                navigate(`/article`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                fill="green"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="dropdown">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          fill="green"
          className="bi bi-people-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
        </svg>
        <ul className="dropdown-content">
          <button
            onClick={(event) => {
              onProfileHandler(event);
            }}
          >
            Profile <img src={user} alt="Profile" width="25" height="25" />
          </button>

          <button
            onClick={() => {
              navigate(`/`);
            }}
          >
            Logout <img src={logout} alt="Profile" width="25" height="25" />
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
