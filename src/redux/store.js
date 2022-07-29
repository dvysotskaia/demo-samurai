import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12 },
        { id: 2, message: "Hello!", likesCount: 1 },
      ],
      newPostText: "it-kamasutra",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Jack" },
        { id: 2, name: "Jane" },
        { id: 3, name: "Paolo" },
        { id: 4, name: "Vike" },
        { id: 5, name: "Mari" },
      ],

      messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "Hi" },
        { id: 3, message: "Yi" },
        { id: 4, message: "Yo" },
        { id: 5, message: "YOOO" },
      ],
      newMessageBody: "",
    },
  },
  _callSubscriber() {
    console.log("State has been changed");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._callSubscriber(this._state);
  },
};

window.store = store;
export default store;
