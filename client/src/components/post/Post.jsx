import "./post.css";
import React, { useState, useEffect, useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + post._id, { userId: currentUser._id });
      console.log(post.userId)
      console.log(currentUser._id)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? publicFolder + user.profilePicture
                    : publicFolder + "person/noavatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon className="moreIcon" />
            <div className="postTopRightDropdown">
              <p onClick={handleDelete}>Delete</p>
            </div>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img className="postImg" src={publicFolder + post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${publicFolder}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${publicFolder}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <div className="span postCommentText">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
