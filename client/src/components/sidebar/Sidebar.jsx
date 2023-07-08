import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <HomeIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Home</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Blogs</span>
          </li>
          <li className="sidebarListItem">
            <PeopleIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Friends</span>
          </li>
          <li className="sidebarListItem">
            <CalendarMonthIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <Link to="/groups" style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <GroupsIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <SmartToyIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Portfolios</span>
          </li>
          <li className="sidebarListItem">
            <VideogameAssetIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Projects</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
