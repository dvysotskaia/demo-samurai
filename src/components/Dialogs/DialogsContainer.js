import { connect } from "react-redux";
import {
  sendMessageAC,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


  // let dialogs = [
  //   { id: 1, name: "Jack" },
  //   { id: 2, name: "Jane" },
  //   { id: 3, name: "Paolo" },
  //   { id: 4, name: "Vike" },
  //   { id: 5, name: "Mari" },
  // ];

  // let messages = [
  //   { id: 1, message: "Hello" },
  //   { id: 2, message: "Hi" },
  //   { id: 3, message: "Yi" },
  //   { id: 4, message: "Yo" },
  //   { id: 5, message: "YOOO" },
  // ];




  


let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageBody: state.dialogsPage.newMessageBody,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    // updateNewMessageBody: (message) => {
    //   dispatch(updateNewMessageBodyAC(message));
    // },
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageAC(newMessageBody));
    },
  };
};



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);;
