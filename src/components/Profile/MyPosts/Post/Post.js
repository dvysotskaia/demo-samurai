import s from "./Post.module.css";

function Post(props) {
  return (
    <div>
      <div className={s.post}>
        <div className={s.avatar}>
          <img
            className={s.avatar_img}
            src="https://cs11.livemaster.ru/storage/topicavatar/300x225/84/2e/5e3da66cd729bb9ee378a67e3ebddb3b3ab4qn.jpg?h=7x45sAr_LjfHFKZn_j2jgw"
            alt=""
          />
        </div>

        <div>{props.message}</div>
      </div>
      <div><span>likes</span> {props.likesCount}</div>
    </div>
  );
}

export default Post;
