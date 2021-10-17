import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SignUp(props) {
  const checkPassword = () => {
    document.getElementById("message").style.display = "none";
    if (
      document.getElementById("password").value ===
      document.getElementById("cpassword").value
    ) {
      document.getElementById("signup").disabled = false;
      document.getElementById("message").style.display = "none";
    }
    if (
      document.getElementById("password").value !==
      document.getElementById("cpassword").value
    ) {
      document.getElementById("signup").disabled = true;
      document.getElementById("message").style.display = "inline-block";
    }
  };
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save hte aith token and redirect
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      props.showAlert("User Account created successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={onChange}
            required
            className="form-control"
            id="name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={onChange}
            required
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            minLength={5}
            required
            onKeyUp={checkPassword}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <span className="text-danger" id="message">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Password not
            matching
          </span>
          <input
            type="password"
            onChange={onChange}
            required
            className="form-control"
            onKeyUp={checkPassword}
            minLength={5}
            id="cpassword"
            name="cpassword"
          />
        </div>

        <button type="submit" id="signup" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
}
