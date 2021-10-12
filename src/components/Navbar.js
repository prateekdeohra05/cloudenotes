import React, { useContext, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

export default function Navbar() {
  const context = useContext(noteContext);
  const { userDetails, getUser } = context;

  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    history.push("/login");
  };
  const location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {localStorage.getItem("token") ? (
            <span className="text-light">
              {userDetails.name} &nbsp;&nbsp;&nbsp;&nbsp;{userDetails.email}
            </span>
          ) : (
            <span className="text-light"></span>
          )}
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary mx-2" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
