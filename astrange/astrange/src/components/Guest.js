import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as GetImg from "../Functions/GetImage";

import axios from "axios";
import * as Api from "./Api";

const Guest = ({ profileImage }) => {
  const { user } = useParams();
  const navigate = useNavigate();

  const [Mess, setMess] = useState({
    id: "",
    content: "",
    reply: "",
    to: user,
  });
  const handleMess = (e) => {
    if (e) {
      setMess((existingValues) => ({
        ...existingValues,
        content: e.target.value,
      }));
    }
  };

  const sendMess = (e) => {
    const newMess = {
      content: Mess.content,
      reply: Mess.reply,
      to: Mess.to,
      id: Mess.id,
    };
    if (Mess.content.trim() !== "") {
      const send = async () => {
        await axios.post("/profile", newMess);
      };
      send();
    }
  };

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

  const teleport = () => {
    let item = localStorage.getItem("authenticated");
    if (item === null || item === "false") {
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="profile">
      <button onClick={teleport} id="back" className="back">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <img
        className="pic1"
        width="20px"
        height="20px"
        src={GetImg.GetImgSrc(profileImage, user)}
        alt="test"
      />
      <form>
        <input
          id="mess"
          type="text"
          className="message1"
          placeholder={`Tell ${user} a secret`}
          onChange={(e) => {
            handleMess(e);
          }}
        />
        <input
          type="submit"
          onClick={(e) => {
            sendMess(e);
          }}
          className="submit-button1"
          value="Whisper!"
        />
      </form>

      <div className="messages-container">
        {messages.length !== 0 &&
          messages
            .filter((m) => m?.reply !== "")
            .reverse()
            .map((m) => (
              <div>
                <div className="mess-reply1">
                  <p className="question">{m?.content}</p>
                  <div className="answer">
                    <img
                      className="pic-reply"
                      src={GetImg.GetImgSrc(profileImage, user)}
                      alt="test"
                    />
                    <p className="answer-text">{m?.reply}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
export default Guest;
