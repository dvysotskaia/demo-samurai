import React from "react";
import Dialog from "./Dialog/Dialog";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import Field from "redux-form/lib/Field";
import reduxForm from "redux-form/lib/reduxForm";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";



function Dialogs(props) {

  const addNewMessage = (values) => {
     props.sendMessage(values.newMessageBody);
  };
  // let dialogs = [
  //   { id: 1, name: "Jack" },
  //   { id: 2, name: "Jane" },
  //   { id: 3, name: "Paolo" },
  //   { id: 4, name: "Vike" },
  //   { id: 5, name: "Mari" },
  // ];

  //из массива с данными, которые придут с сервера,
  //нам нужно получить массив JSX элементов(наших отдельных компонент)
  let dialogsElements = props.dialogs.map((d) => {
    return <Dialog key={d.id} id={d.id} name={d.name} />;
  });

  // let messages = [
  //   { id: 1, message: "Hello" },
  //   { id: 2, message: "Hi" },
  //   { id: 3, message: "Yi" },
  //   { id: 4, message: "Yo" },
  //   { id: 5, message: "YOOO" },
  // ];

  let messagesElements = props.messages.map((m) => {
    return <Message key={m.id} id={m.id} message={m.message} />;
  });

  // let onMessageChange = (e) => {
  //   let message = e.target.value;
  //   props.updateNewMessageBody(message);
  // };

  // let onSendMessage = () => {
  //   props.sendMessage();
  // };

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogs_items}>{dialogsElements}</div>
        <div className={s.messages}>{messagesElements}</div>
      </div>
      <DialogsReduxForm onSubmit={addNewMessage} />
      {/* <div className={s.form}>
        <textarea
          onChange={onMessageChange}
          placeholder="Enter your message"
          value={props.newMessageBody}
        />
        <button onClick={onSendMessage}>Send message</button>
      </div> */}
    </div>
  );
}

function DialogsForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.form}>
        <Field
          placeholder={"Enter your message"}
          component={Textarea}
          name={"newMessageBody"}
          validate={[required, maxLengthCreator(30)]}
        />
        <button>Send message</button>
      </div>
    </form>
  );
}

const DialogsReduxForm = reduxForm({
  // a unique name for the form
  form: "dialogs",
})(DialogsForm);


export default Dialogs;
