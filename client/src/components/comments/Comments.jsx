import React, { useContext, useEffect, useState } from "react";
import "./comments.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get();
    };
  });

  return (
    <div className="comments">
      <div className="commentsWrite">
        <img
          src={
            user.profilePicture
              ? publicFolder + user.profilePicture
              : publicFolder + "person/noavatar.png"
          }
          alt=""
        />
        <input type="text" placeholder="Write a comment" />
        <button>Send</button>
      </div>
    </div>
  );
}
