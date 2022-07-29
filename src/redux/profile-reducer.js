import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD_POST";
// const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "Hello!", likesCount: 1 },
  ],
  // newPostText: "it-kamasutra",
  profile: null,
  status: "",
};

let profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };

    // case UPDATE_NEW_POST_TEXT:
    //   return {
    //     ...state,
    //     newPostText: action.newText,
    //   };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter( p => p.id !== action.postId),
      };

    default:
      return state;
  }
};

export let addPostAC = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

// export let updateNewPostTextAC = (text) => {
//   return {
//     type: UPDATE_NEW_POST_TEXT,
//     newText: text,
//   };
// };

export let setUserProfileAC = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

export let setStatusAC = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

export let deletePostAC = (postId) => {
  return {
    type: DELETE_POST,
    postId
  };
};

//THUNK

//THUNK установить профиль пользователя

export const profileThunkCreator = (userId) => {
  return (dispatch) => {
    usersAPI.setProfile(userId).then((response) => {
      dispatch(setUserProfileAC(response.data));
    });
  };
};

//THUNK получить статус пользователя

export const getProfileStatusThunkCreator = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setStatusAC(response.data));
    });
  };
};

//THUNK обновить статус пользователя

export const updateProfileStatusThunkCreator = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status));
      }
      
    });
  };
};

export default profileReducer;
