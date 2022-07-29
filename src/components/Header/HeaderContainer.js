import { connect } from "react-redux";
import React from "react";
import Header from "./Header";
import { authUserThunkCreator, logoutThunkCreator, setUserDataAC } from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {
  // componentDidMount = () => {
  //   this.props.auth(this.props.id, this.props.email, this.props.login);
  //   axios
  //     .get(
  //       `https://social-network.samuraijs.com/api/1.0/auth/me`,
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       if (response.data.resultCode === 0) {
  //         let { id, email, login } = response.data.data;
  //         this.props.setAuthUsersData(id, email, login);
  //       }
  //     });
  // }
    
  render = () => {
    return <Header {...this.props} />
  }

}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    setAuthUsersData: (id, email, login) => {
      dispatch(setUserDataAC(id, email, login));
    },
    //Thunk
    auth: (id, email, login) => {
      dispatch(authUserThunkCreator(id, email, login));
    },
    logOut: () => {
      dispatch(logoutThunkCreator());
    },
  };
}
  

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

