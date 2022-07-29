import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Users(props) {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  console.log(pagesCount)
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / props.portionSize);
  console.log(props.totalUsersCount);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  let rightPortionPageNumber = portionNumber * props.portionSize;


  return (
    <div>
      { portionNumber >= 1 && 
        <button onClick={() => { setPortionNumber(portionNumber - 1)}}>
          PREV
        </button>
      }
        {pages.filter(
            (page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber
      )
       
          .map((page) => {
            return (
              <span
                key={page.id}
                onClick={(e) => {
                  props.setCurrentPage(page);
                }}
                className={props.currentPage === page ? s.selectedPage : null}
              >
                {page}
              </span>
            );
          })}
  
      {portionCount >= portionNumber && 
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)}}>
          NEXT
        </button>
      }
      {props.users.map((user) => (
        <div className={s.user} key={user.id}>
          <div className={s.info}>
            <div className={s.avatar}>
              <NavLink to={"/profile/" + user.id}>
                <img
                  className={s.avatar_img}
                  src={
                    user.photos.small != null ? user.photos.small : userPhoto
                  }
                  alt=""
                />
              </NavLink>
            </div>

            <div>
              {user.followed ? (
                <button
                  disabled={props.followingProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.unfollow(user.id);
                    // props.toggleFollowingProgress(true, user.id);
                    // usersAPI.unfollow(user.id).then((response) => {
                    //   if (response.data.resultCode === 0) {
                    //     props.unfollow(user.id);
                    //   }
                    //   props.toggleFollowingProgress(false, user.id);
                    // });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.follow(user.id);
                    // props.toggleFollowingProgress(true, user.id);
                    // usersAPI.follow(user.id)
                    //   .then((response) => {
                    //   if (response.data.resultCode === 0) {
                    //     props.follow(user.id);
                    //   }
                    //   props.toggleFollowingProgress(false, user.id);
                    // });
                  }}
                >
                  Follow
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
