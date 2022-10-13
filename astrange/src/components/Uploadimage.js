import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const Uploadimage = ({ addPhoto }) => {
  let name = localStorage.getItem("authenticated");
  // eslint-disable-next-line
  const [imageUpload, setImageUpload] = useState(null);
  // eslint-disable-next-line
  const [imageUrls, setImageUrls] = useState([]);

  const uploadFile = (i) => {
    if (i == null) return;
    const imageRef = ref(storage, `images/${name}`);
    uploadBytes(imageRef, i).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setTimeout(() => {
          document.location.reload();
        }, 10);
      });
    });
  };

  return (
    <div className="upload">
      <input
        onChange={(e) => {
          uploadFile(e.target.files[0]);
          setImageUpload(e.target.files[0]);
        }}
        type="file"
        id="files"
        style={{ display: "none" }}
      />
      <label htmlFor="files">
        <span className="material-symbols-outlined">{addPhoto}</span>
      </label>
    </div>
  );
};

export default Uploadimage;
