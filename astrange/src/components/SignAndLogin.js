import "../css/App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { SocialIcon } from "react-social-icons";

const Sign_and_login = () => {
  const navigate = useNavigate();
  let item = localStorage.getItem("authenticated");
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
    const send = async () => {
      let Isvalid = await axios.post(`/users`, person);
      if (Isvalid.data.length !== 0) {
        localStorage.setItem("authenticated", person.userName);
        navigate(`/Profile/${person.userName}`);
      } else {
        alert("Wrong credentials");
      }
    };
    send();
  };

  const createUser = () => {
    const send = async () => {
      let Isvalid = await axios.post(`/checkUsers`, person);
      if (Isvalid.data.length !== 0) {
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
          localStorage.setItem("authenticated", person.userName);
          axios.post("/createUser", newUser);
          navigate(`/Profile/${newUser.userName}`);
        }
      }
    };
    send();
  };
  if (item !== null) {
    navigate(`/Profile/${item}`);
  } else if (item === null) {
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
                <SocialIcon
                  className="social-icons"
                  url="https://twitter.com/MomenGharib2"
                />
                <SocialIcon
                  className="social-icons"
                  url="https://www.facebook.com/Momen.gharib22"
                />
                <SocialIcon
                  className="social-icons"
                  url="https://github.com/MomenGharib1"
                />
                <SocialIcon
                  className="social-icons"
                  url="https://www.linkedin.com/in/momengharib/"
                />
                <div className="hr"></div>
                <div className="foot-lnk">
                  <button className="forget">Forgot Password?</button>
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
  }
};

export default Sign_and_login;
