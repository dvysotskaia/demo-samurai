import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  getProfileStatusThunkCreator,
  profileThunkCreator,
  setUserProfileAC,
  updateProfileStatusThunkCreator,
} from "../../redux/profile-reducer";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

  
//   (props) => {
//   if (!props.isAuth) return <Navigate to="/login" />;
//   return <ProfileContainer {...props} />;
// };


class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.autherizedUserId;

      if (!userId) {
        this.props.history.push('/login');
      }
    }
    this.props.setProfile(userId);
    this.props.getStatus(userId);
    // axios
    //   .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    //   .then((response) => {
    //     this.props.setUserProfile(response.data);
    //   });
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile}
      status={this.props.status}
      updateStatus={this.props.updateStatus}
    />;
  }
}


let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autherizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setUserProfile: (profile) => {
      dispatch(setUserProfileAC(profile));
    },

    //THUNK
    setProfile: (userId) => {
      dispatch(profileThunkCreator(userId));
    },

    getStatus: (userId) => {
      dispatch(getProfileStatusThunkCreator(userId));
    },
    updateStatus: (status) => {
      dispatch(updateProfileStatusThunkCreator(status));
    },
  };
};



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

