import "../css/App.css";
import SignAndLogin from "./SignAndLogin";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Messages from "./Messages";
import Guest from "./Guest";
import Home from "./Home";
import axios from "axios";
import Uploadimage from "./Uploadimage";
import { GetImages } from "./GetImages";
const App = () => {
  axios.defaults.baseURL = "https://astrange-server.herokuapp.com";
  let profileImage = GetImages();

  return (
    <Routes>
      <Route exact path="/" element={<SignAndLogin />} />
      <Route
        path="/Profile/:user"
        element={<Profile profileImage={profileImage} />}
      />
      <Route path="/Messages/:user" element={<Messages />} />
      <Route path="/Home" element={<Home profileImage={profileImage} />} />
      <Route
        path="/Guest/:user"
        element={<Guest profileImage={profileImage} />}
      />
      <Route path="/upload" element={<Uploadimage />} />
    </Routes>
  );
};

export default App;
