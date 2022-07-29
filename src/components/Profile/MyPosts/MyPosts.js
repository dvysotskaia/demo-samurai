import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import Field from "redux-form/lib/Field";
import reduxForm from "redux-form/lib/reduxForm";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../../common/FormsControls/FormsControls";


function MyPosts(props) {
  // let posts = [
  //   { id: 1, message: "Hi, how are you?", likesCount: 12 },
  //   { id: 2, message: "Hello!", likesCount: 1 },
  // ];

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  // let onAddPost = () => {
  //   props.addPost();
  // };

  // let onPostChange = (e) => {
  //   let text = e.target.value;
  //   props.updateNewPostText(text);
  // };

  let postsElements = props.posts.map((p) => {
    return (
      <Post
        key={p.id}
        id={p.id}
        message={p.message}
        likesCount={p.likesCount}
      />
    );
  });

  return (
    <div className={s.posts}>
      <h4>My Posts</h4>
      {/* <div className={s.form}>
        <textarea onChange={onPostChange} value={props.newPostText} />
        <button onClick={onAddPost}>Add post</button>
      </div> */}
      <PostReduxForm onSubmit={onAddPost} />
      {postsElements}
    </div>
  );
}

function PostForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Add your post"}
          component={Textarea}
          name={"newPostText"}
          validate={[required, maxLengthCreator(30)]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
}

const PostReduxForm = reduxForm({
  // a unique name for the form
  form: "post",
})(PostForm);

export default MyPosts;
