import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

function Header(props) {
  return (
    <header className={s.header}>
      <div>Logo</div>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - 
            <button onClick={props.logOut}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
