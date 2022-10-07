import axios from "axios";

const Delete = ({ m, changeMess }) => {
  const deleteMess = () => {
    const Mess = {
      content: m.content,
      reply: m.reply,
      id: m._id,
    };
    axios.post("/delete", Mess);
    changeMess(m);

    console.log("message deleted");
  };

  return (
    <button onClick={deleteMess} className="delete-inbox-button">
      <span className="material-symbols-outlined">delete</span>
    </button>
  );
};
export default Delete;
