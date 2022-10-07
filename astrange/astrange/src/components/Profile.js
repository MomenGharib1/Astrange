import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as Api from "./Api";
import { Navigate } from "react-router-dom";
import Delete from "./Delete";
import Uploadimage from "./Uploadimage";
import * as GetImg from "../Functions/GetImage";

const Profile = ({ profileImage }) => {
  let base_url = window.location.origin;
  const { user } = useParams();
  let profile_url = base_url.concat("/guest").concat(`/${user}`);

  const [Mess, setMess] = useState({
    id: "",
    to: user,
    content: "",
    reply: "",
  });
  const [messages, setMessages] = useState([
    {
      id: "",
      content: "",
      reply: "",
    },
  ]);

  useEffect(() => {
    const getMess = async () => {
      const list = await Api.getMess();
      setMessages(list.filter((m) => m.to === user));
    };
    getMess();
  }, [user]);
  const handleMess = (e) => {
    if (e) {
      setMess((existingValues) => ({
        ...existingValues,
        content: e.target.value,
      }));
    }
  };

  const sendMess = () => {
    const newMess = {
      content: Mess.content,
      reply: Mess.reply,
      id: Mess.id,
      to: Mess.to,
    };
    if (Mess.content.trim() !== "") {
      const send = async () => {
        await axios.post("/profile", newMess);
      };
      send();
    }
  };
  const update = (m) => {
    setMessages(messages.filter((n) => n._id !== m._id));
  };
  const copy = () => {
    let copyText = document.getElementById("copy");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  };

  if (localStorage.getItem("authenticated") !== user) {
    return (
      <Navigate
        replace
        to={`/profile/${localStorage.getItem("authenticated")}`}
      />
    );
  } else {
    return (
      <div className="profile">
        <Link
          to={`/Messages/${user}`}
          id="notifications"
          type="button"
          className="icon-button"
        >
          <span className="material-icons">notifications</span>
          <span className="icon-button__badge">
            {messages.filter((m) => m.reply === "").length}
          </span>
        </Link>
        <Link to={"/Home"} id="home" type="button" className="home">
          <span className="material-icons">home</span>
        </Link>
        <div className="copy-link">
          <input
            id="copy"
            disabled
            className="link"
            value={`${profile_url}`}
          ></input>
          <button onClick={copy} className="copy">
            <span className="material-symbols-outlined">content_copy</span>
          </button>
        </div>
        <div className="secret">
          <Uploadimage />
          <img
            className="pic"
            width="20px"
            height="20px"
            src={GetImg.GetImgSrc(profileImage, user)}
            alt="test"
          />
          <form>
            <input
              id="mess"
              type="text"
              className="message"
              placeholder={`Tell ${user} a secret`}
              onChange={(e) => {
                handleMess(e);
              }}
            />
            <input
              type="submit"
              className="submit-button"
              value="Whisper!"
              onClick={() => {
                sendMess();
              }}
            />
          </form>
        </div>

        <div className="messages-container">
          {messages.length !== 0 &&
            messages
              .filter((m) => m.reply !== "")
              .reverse()
              .map((m) => (
                <div>
                  <div className="mess-reply">
                    <div className="delete-profile">
                      <Delete m={m} changeMess={update} />
                    </div>

                    <p className="question">{m.content}</p>
                    <div className="answer">
                      <img
                        className="pic-reply"
                        src={GetImg.GetImgSrc(profileImage, user)}
                        alt="test"
                      />
                      <p className="answer-text">{m.reply}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    );
  }
};

export default Profile;
