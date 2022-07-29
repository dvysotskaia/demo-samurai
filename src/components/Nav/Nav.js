import s from "./Nav.module.css";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.item)}
          to="/profile"
        >
          Profile
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.item)}
          to="/dialogs"
        >
          Dialogs
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.item)}
          to="/users"
        >
          Users
        </NavLink>
      </div>

      <div className={s.item}>
        <a>News</a>
      </div>

      <div className={s.item}>
        <a>Settings</a>
      </div>
    </nav>
  );
}

export default Nav;
