import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import * as GetImg from "../Functions/GetImage";
import { IncreaseLikes } from "../Functions/IncreaseLikes";

import * as api from "./Api";
const Home = ({ profileImage }) => {
  let Item = localStorage.getItem("authenticated");

  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([
    {
      userName: "",
      id: "",
      content: "",
      comments: [],
      likes: [],
    },
  ]);
  useEffect(() => {
    const getPosts = async () => {
      const list = await api.getPosts();
      setPosts(list.reverse());
    };
    getPosts();
  }, []);

  const [post, setPost] = useState({
    userName: "",
    id: "",
    content: "",
    comments: [],
    likes: [],
  });

  const handlePost = (e) => {
    if (e) {
      setPost((existingValues) => ({
        ...existingValues,
        content: e.target.value,
      }));
    }
  };

  const sendPost = (e) => {
    const newPost = {
      userName: Item,
      content: post.content,
      id: post.id,
      comments: post.comments,
      likes: post.likes,
    };

    if (post.content.trim() !== "") {
      const send = async () => {
        await axios.post("/post", newPost);
      };
      send();
      setPosts(posts.concat(newPost));
    }
  };
  const handlecomment = (e, p) => {
    setComment(e.target.value);
  };
  const sendComment = (p, e) => {
    const editPost = {
      userName: Item,
      content: p.content,
      id: p._id,
      comments: p.comments.concat({
        name: Item,
        commentBody: comment,
      }),
      likes: p.likes,
    };
    if (comment.trim() !== "") {
      const send = async () => {
        await axios.post("/comments", editPost);
      };
      send();
    }
  };

  const visitProfile = (name) => {
    if (name === Item) {
      navigate(`/profile/${name}`);
    } else navigate(`/Guest/${name}`);
  };

  if (Item === null) {
    return <Navigate replace exact to="/" />;
  } else {
    return (
      <div className="profile">
        <Link to={`/Profile/${Item}`} id="back" type="button" className="back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="post">
          <div className="post-header">
            <img
              onClick={() => visitProfile(Item)}
              className="post-pic"
              src={GetImg.GetImgSrc(profileImage, Item)}
              alt="test"
            ></img>
            <p onClick={() => visitProfile(Item)} className="post-name">
              {Item}{" "}
            </p>
          </div>
          <div className="post-content">
            <form>
              <input
                type="text"
                className="post-input"
                placeholder="Tell us your secrets, strange "
                onChange={(e) => {
                  handlePost(e);
                }}
              ></input>
              <input
                type="submit"
                className="submit-post"
                value="Post"
                onClick={(e) => {
                  sendPost(e);
                }}
              ></input>
            </form>
          </div>
        </div>
        <div className="feed">
          {posts.map((p) => (
            <div key={p._id} className="feed-post">
              <div className="feed-post-header">
                <img
                  className="post-pic"
                  src={GetImg.GetImgSrc(profileImage, p.userName)}
                  alt="test"
                  onClick={() => visitProfile(p.userName)}
                ></img>
                <p
                  onClick={() => visitProfile(p.userName)}
                  className="post-name"
                >
                  {p.userName}
                </p>
              </div>
              <p className="feed-content">{p?.content}</p>
              <div className="buttons">
                <div
                  onClick={(e) => IncreaseLikes(p, e, Item)}
                  className="love-button"
                  style={
                    p.likes.filter((s) => s.name === Item).length === 1
                      ? { color: "rgb(205, 71, 71)" }
                      : { color: "#464343" }
                  }
                >
                  <span className="material-symbols-outlined">favorite</span>
                  <span
                    id={`${p.userName}${p.content
                      .replace(/[^a-zA-Z0-9ا-ي]+/gi, "")
                      .split("")
                      .join("")}`}
                    className="loves-num"
                  >
                    {p.likes.length}
                  </span>
                </div>
                <div className="comment-button">
                  <span className="material-symbols-outlined">chat_bubble</span>
                  <span className="comments-num">{p.comments.length}</span>
                </div>
              </div>
              <div className="comment-form">
                <form
                  style={
                    p.comments.length !== 0
                      ? { borderBottom: "2px solid #4f5581" }
                      : { border: "none" }
                  }
                >
                  <img
                    className="comment-pic"
                    src={GetImg.GetImgSrc(profileImage, Item)}
                    alt="test"
                  ></img>
                  <input
                    type="text"
                    className="add-comment"
                    placeholder={`Share your thoughts with ${p.userName}`}
                    onChange={(e) => {
                      handlecomment(e, p);
                    }}
                  ></input>
                  <button
                    onClick={(e) => sendComment(p, e)}
                    className="send-comment"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </form>
              </div>
              <div>
                {p.comments.map((c) => (
                  <div>
                    <img
                      onClick={() => visitProfile(c.name)}
                      className="commenter-pic"
                      src={GetImg.GetImgSrc(profileImage, c.name)}
                      alt="test"
                    ></img>
                    <div className="comments">
                      <p
                        onClick={() => visitProfile(c.name)}
                        className="commenter-name"
                      >
                        {c.name}
                      </p>
                      <p className="comment-body">{c.commentBody}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
export default Home;
