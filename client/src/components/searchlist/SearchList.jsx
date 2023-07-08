import React, { useMemo } from "react";
import "./searchList.css";
import { Link } from "react-router-dom";

export default function SearchList({ users, search }) {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const username = user.username
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const city = user.city?.toLowerCase().includes(search.toLowerCase());
      const from = user.from?.toLowerCase().includes(search.toLowerCase());
      return username || city || from;
    });
  }, [users, search]);

  return (
    <div className="searchlist">
      <div className="searchlistWrapper">
        <ul>
          {filteredUsers.map((u) => (
            <Link
              to={`/profile/${u.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="searchlistItem">
                <img
                  src={
                    u.profilePicture
                      ? publicFolder + u.profilePicture
                      : publicFolder + `person/noavatar.png`
                  }
                  alt=""
                  className="searchlistImg"
                />
                <li>{u.username}</li>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
