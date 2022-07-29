// const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
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
};

let dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY: 
    //  return {
    //     ...state,
    //     newMessageBody: action.body
    //   };
    
    case SEND_MESSAGE:
     let body = action.newMessageBody;  
       return {
         ...state,
         messages: [...state.messages, { id: 6, message: body }] // вместо метода массива push? добавляем новое сообщение в массив
       };
    
    default:
      return state;
  }
};

// export let updateNewMessageBodyAC = (body) => {
//   return {
//     type: UPDATE_NEW_MESSAGE_BODY,
//     body: body,
//   };
// };

export let sendMessageAC = (newMessageBody) => {
  return {
    type: SEND_MESSAGE,
    newMessageBody
  };
};

export default dialogsReducer;
