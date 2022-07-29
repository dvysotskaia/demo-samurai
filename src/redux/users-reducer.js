import { usersAPI } from "../api/api";
const FOLLOW_SUCCES = "FOLLOW_SUCCES";
const UNFOLLOW_SUCCES = "UNFOLLOW_SUCCES";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [],
  portionSize: 10,
};

let usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_SUCCES:
      return {
        ...state,
        // users: [...state.users] ..идентичная запись как и map
        //так же возвращает новый массив
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: true,
            };
          }
          return user;
        }),
      };
    case UNFOLLOW_SUCCES:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: false,
            };
          }
          return user;
        }),
      };
    case SET_USERS: {
      // if (state.users.length > 0) {
      //   return state;
      // }
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalCount: action.count,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingProgress: action.followingProgress
          ? [...state.followingProgress, action.userId]
          : [state.followingProgress.filter((id) => id != action.userId)],
      };
    default:
      return state;
  }
};

export let setUsersAC = (users) => ({ type: SET_USERS, users });
export let followSuccesAC = (userId) => ({ type: FOLLOW_SUCCES, userId });
export let unfollowSuccesAC = (userId) => ({ type: UNFOLLOW_SUCCES, userId });

export let setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export let setTotalUsersCountAC = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalCount,
});

export let toggleIsFetchingAC = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export let toggleFollowingProgressAC = (followingProgress, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  followingProgress,
  userId,
});

//THUNK

//Thunk getUsers получаем пользователей  с сервера и диспатчим
export const getUsersThunkCreator = (currentPage, pageSize) => {
  debugger;
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(setCurrentPageAC(currentPage));
      dispatch(toggleIsFetchingAC(false));
      dispatch(setUsersAC(data.items));
      dispatch(setTotalUsersCountAC(data.totalCount));
    });
  };
};

//Thunk unfollow отписаться от пользователя

export const unfollowThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgressAC(true, userId));
    usersAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSuccesAC(userId));
      }
      dispatch(toggleFollowingProgressAC(false, userId));
    });
  };
};

//Thunk follow подписаться на пользователя

export const followThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgressAC(true, userId));
    usersAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(followSuccesAC(userId));
      }
      dispatch(toggleFollowingProgressAC(false, userId));
    });
  };
};

export default usersReducer;
