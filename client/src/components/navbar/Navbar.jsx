import "./navbar.css";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import SearchList from "../searchlist/SearchList";

export default function Navbar() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/users/all");
      setUsers(res.data);
      console.log(res.data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social App</span>
        </Link>
      </div>
      <div className="navbarCenter">
        <div className="searchbar">
          <input
            placeholder="Search"
            type="searchInput"
            className="searchInput"
            onChange={handleSearch}
            value={search}
          />
        </div>
        {search && (
          <div className="searchList">
            <SearchList users={users} search={search} />
          </div>
        )}
        <div className="navbarLinks">
          <select className="navbarLinksItems">
            <option>All Content</option>
            <option>Friends</option>
            <option>Groups</option>
            <option>Events</option>
          </select>
        </div>
        <SearchIcon className="searchIcon" />
      </div>
      <div className="navbarRight">
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <PersonIcon />
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIconItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ChatIcon />
            </Link>
            <span className="navbarIconBadge">2</span>
          </div>
          <div className="navbarIconItem">
            <NotificationsIcon />
            <span className="navbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "person/noavatar.png"
            }
            alt=""
            className="navbarProfilePicture"
          />
        </Link>
        <div className="navbarDropdown">
          {user.username}
          <div className="navbarDropdownContent">
            <Link to="/login">
              <a href="#">Logout</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
