import "./App.css";
import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeAppTnunkCreator } from "./redux/app-reducer";
import Preloader from "./common/Preloader/Preloader";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/redux-store";
import { Provider } from "react-redux";

// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { withRouter } from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer")
);


class App extends React.Component{
  componentDidMount = () => {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
       return <Preloader/>
    }
    return (
      <div className="App">
        <HeaderContainer />
        <Nav />
        <div className="main">
          <Routes>
            <Route
              path="/profile/:userId"
              element={
                <Suspense fallback={<Preloader />}>
                  <ProfileContainer />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Preloader />}>
                  <ProfileContainer />
                </Suspense>
              }
            />

            <Route
              path="/dialogs/*"
              element={
                <Suspense fallback={<Preloader />}>
                  <DialogsContainer />
                </Suspense>
              }
            />
            <Route path="/users/*" element={<UsersContainer />} />
            <Route path="/login/" element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  }
  
};

let mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
  
}

let mapDispatchToProps = (dispatch) => {
  return {
    initializeApp: (id, email, login) => {
     dispatch(initializeAppTnunkCreator(id, email, login)) ;
    },
  };
}

let AppContainer =  compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);

const SamuraiJSApp = (props) => {
  return  <BrowserRouter>
     <Provider store={store}>
       <AppContainer />
     </Provider>
   </BrowserRouter>;
}

export default SamuraiJSApp;
