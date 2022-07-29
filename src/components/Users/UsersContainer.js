import { connect } from "react-redux";
import {
  followSuccesAC,
  setCurrentPageAC,
  toggleIsFetchingAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowSuccesAC,
  toggleFollowingProgressAC,
  getUsersThunkCreator,
  followThunkCreator,
  unfollowThunkCreator,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { currentPageSelector, followingProgressSelector, getPortionSizeSelector, getUsersSelector, isFetchingSelector, pageSizeSelector, totalUsersCountSelector, } from "../../redux/selectors/users-selectors";
import { usersAPI } from "../../api/api";
import axios from "axios";

class UsersAPIComponent extends React.Component {
  componentDidMount = () => {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);

    // let response = axios
    //   .get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=10`)
    //   .then((response) => {
    //     this.props.setTotalUsersCount(response.data.totalCount);
    //   });
    

    // let response = usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(
    //   (data) => {
    //     this.props.setTotalUsersCount(data.totalCount);
    //   }
    // );

  }

    setCurrentPage = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };


  render = () => {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          {...this.props}
          // totalUsersCount={this.props.totalUsersCount}
          // pageSize={this.props.pageSize}
          // currentPage={this.props.currentPage}
          // setCurrentPage={this.setCurrentPage}
          // users={this.props.users}
          // follow={this.props.follow}
          // unfollow={this.props.unfollow}
          // toggleFollowingProgress={this.props.toggleFollowingProgress}
          // followingProgress={this.props.followingProgress}
          // portionSize={this.props.portionSize}
        />
      </>
    );
  };
}


// let mapStateToProps = (state) => {
//   return {
//     users: getUsersSelector(state),
//     pageSize: pageSizeSelector(state),
//     totalUsersCount: totalUsersCountSelector(state),
//     currentPage: currentPageSelector(state),
//     isFetching: isFetchingSelector(state),
//     followingProgress: followingProgressSelector(state),
//     portionSize: getPortionSizeSelector(state),
//   };
// };

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingProgress: state.usersPage.followingProgress,
    portionSize: state.usersPage.portionSize,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    followSucces: (userId) => {
      dispatch(followSuccesAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowSuccesAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageAC(pageNumber));
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountAC(totalCount));
    },
    toggleIsFetching: (isFetching) => {
      dispatch(toggleIsFetchingAC(isFetching));
    },
    toggleFollowingProgress: (followingProgress, userId) => {
      dispatch(toggleFollowingProgressAC(followingProgress, userId));
    },
    //THUNK CREATOR
    getUsers: (currentPage, pageSize) => {
      dispatch(getUsersThunkCreator(currentPage, pageSize));
    },
    follow: (userId) => {
      dispatch(followThunkCreator(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowThunkCreator(userId));
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  // withAuthRedirect
)(UsersAPIComponent);

