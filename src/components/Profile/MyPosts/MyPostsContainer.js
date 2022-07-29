import { addPostAC, updateNewPostTextAC } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    // updateNewPostText: (text) => {
    //   dispatch(updateNewPostTextAC(text));
    // },
    addPost: (newMessagePost) => {
      dispatch(addPostAC(newMessagePost));
    },
  };
};

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
