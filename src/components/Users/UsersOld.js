import axios from "axios";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";

function Users(props) {
  let getUsers = () => {
    if (props.users.length === 0) {
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          props.setUsers(response.data.items);
        });
    }
  };

  return (
    <div>
      <button onClick={getUsers}>Get Users</button>
      {props.users.map((user) => (
        <div className={s.user} key={user.id}>
          <div className={s.info}>
            <div className={s.avatar}>
              <img
                className={s.avatar_img}
                src={user.photos.small != null ? user.photos.small : userPhoto}
                alt=""
              />
            </div>
            <div>
              {user.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(user.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(user.id);
                  }}
                >
                  follow
                </button>
              )}
            </div>
          </div>

          <div className={s.name}>
            <div className={s.name_user}>{user.name}</div>
            <div>{user.status}</div>
          </div>

          {/* <div className={s.location}>
            <div>{user.location.country}</div>
            <div>{user.location.city}</div>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default Users;
