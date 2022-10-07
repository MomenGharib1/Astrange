import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Api from "./Api";
import { Navigate, useParams } from "react-router-dom";
import Delete from "./Delete";

const Messages = () => {
  const { user } = useParams();

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
      setMessages(
        list.filter((m) => m?.reply === "" && m.to === user).reverse()
      );
    };
    getMess();
  }, [user]);

  const [reply, setReply] = useState("");
  const handleMess = (e) => {
    if (e) {
      setReply(e.target.value);
    }
  };
  const sendReply = (m) => {
    const newMess = {
      id: m._id,
      content: m.content,
      reply: reply,
    };
    if (newMess?.reply && reply.trim() !== "") {
      setMessages(messages.filter((n) => n?._id !== m._id));
      const send = async () => {
        await axios.post("/reply", newMess);
      };
      send();
    }
    setReply("");
  };

  const update = (m) => {
    setMessages(messages.filter((n) => n._id !== m._id));
  };

  if (localStorage.getItem("authenticated") !== user) {
    return (
      <Navigate
        replace
        to={`/messages/${localStorage.getItem("authenticated")}`}
      />
    );
  } else {
    return (
      <div className="inbox">
        <Link to={`/Profile/${user}`} id="back" type="button" className="back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        {messages.length === 0 && (
          <p className="No-mess">You don't have new secrets yet!</p>
        )}
        {messages.length !== 0 &&
          messages.map((m) => (
            <div className="inbox-">
              <div className="delete-inbox">
                <Delete m={m} changeMess={update} />
              </div>

              <form className="inbox-form">
                <div className="mess">
                  <p>{m?.content}</p>
                </div>
                <input
                  id="reply"
                  type="text"
                  className="reply-input"
                  placeholder="type your reply here..."
                  onChange={(e) => {
                    handleMess(e);
                  }}
                ></input>
                <button
                  type="submit"
                  onClick={() => sendReply(m)}
                  className="reply"
                >
                  Reply!
                </button>
              </form>
            </div>
          ))}
      </div>
    );
  }
};

export default Messages;
