import "../css/App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Api from "./Api";

const Sign_and_login = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState([
    {
      id: "",
      userName: "",
      email: "",
      password: "",
    },
  ]);
  useEffect(() => {
    const getUsers = async () => {
      const list = await Api.getUsers();
      setPersons(list);
    };
    getUsers();
  }, [persons]);

  const [person, setPerson] = useState({
    id: "",
    userName: "",
    email: "",
    password: "",
  });
  const handleUser = (e) => {
    const user = { ...person };
    user[e.target.id] = e.target.value;
    setPerson(user);
  };

  const handleSubmit = () => {
    const Loggedperson = persons.filter(
      (p) => p.userName === person.userName && p.password === person.password
    );
    if (Loggedperson.length !== 0) {
      sessionStorage.setItem("authenticated", person.userName);
      navigate(`/Profile/${person.userName}`);
    } else {
      alert("Wrong credentials");
      sessionStorage.setItem("authenticated", false);
    }
  };

  const createUser = () => {
    const Loggedperson = persons.filter(
      (p) => p.userName === person.userName || p.email === person.email
    );

    if (Loggedperson.length !== 0) {
      alert("username or email already exists");
    } else {
      const newUser = {
        userName: person.userName,
        email: person.email,
        password: person.password,
        id: person.id,
      };

      if (
        newUser.userName.trim() &&
        newUser.email.trim() &&
        newUser.password.trim()
      ) {
        sessionStorage.setItem("authenticated", person.userName);

        axios.post("/createUser", newUser);
        navigate(`/Profile/${newUser.userName}`);
      }
    }
  };

  return (
    <div className="App">
      <div className="login-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            defaultChecked
            readOnly
          />
          <label htmlFor="tab-1" className="tab">
            Sign In
          </label>
          <input
            id="tab-2"
            type="radio"
            name="tab"
            className="sign-up"
            readOnly
          />
          <label htmlFor="tab-2" className="tab">
            Sign Up
          </label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Username
                </label>
                <input
                  id="userName"
                  type="text"
                  className="input"
                  required
                  onChange={(e) => {
                    handleUser(e);
                  }}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  data-type="password"
                  onChange={(e) => {
                    handleUser(e);
                  }}
                />
              </div>

              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Sign In"
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Username
                </label>
                <input
                  id="userName"
                  type="text"
                  className="input"
                  onChange={(e) => {
                    handleUser(e);
                  }}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  data-type="password"
                  onChange={(e) => {
                    handleUser(e);
                  }}
                />
              </div>

              <div className="group">
                <label htmlFor="pass" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="text"
                  className="input"
                  onChange={(e) => {
                    handleUser(e);
                  }}
                />
              </div>
              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Sign Up"
                  onClick={() => {
                    createUser();
                  }}
                />
              </div>
              <div className="hr"></div>
              <div className="foot-lnk"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_and_login;
