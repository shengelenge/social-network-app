import React, { useContext, useEffect, useRef, useState } from "react";
import "./group.css";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useFormik } from "formik";

export default function Group() {
  const [groups, setGroups] = useState([]);
  const { user } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await axios.get("/groups/all");
      setGroups(res.data);
      console.log(res);
    };
    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGroup = {
      userId: user._id,
      name: "default",
    };
    try {
      await axios.post("/groups", newGroup);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="groups">
        <div className="groupsMenu">
          <div className="groupsMenuWrapper">
            <span className="groupsLogo">Groups</span>
            <div className="groupsSearchbar">
              <input
                placeholder="Search groups"
                type="searchInput"
                className="searchInput"
              />
            </div>
            <div className="groupsMenuList">
              <div className="groupsMenuListItem">Your feed</div>
              <div className="groupsMenuListItem">Your groups</div>
            </div>
            <button className="createGroupButton" onClick={handleSubmit}>
              Create new group
            </button>
            <hr />
            <span className="groupsYouMange">Groups you manage</span>
            {groups
              .filter((group) => group.admin === user._id)
              .map((group) => (
                <span key={group._id}>{group.name}</span>
              ))}
            <hr />
            <span className="groupsYouJoined">Groups you've joined</span>
            {groups
              .filter((group) => group.members.includes(user._id))
              .map((group) => (
                <span key={group._id}>{group.name}</span>
              ))}
          </div>
        </div>
        <div className="groupsFeed">
          <div className="groupsFeedWrapper">Feed</div>
        </div>
      </div>
    </>
  );
}
