import React, { useEffect, useState } from "react";

function ProfileStatusWithHooks(props) {
  // let stateWithSetState = useState(false); // массив
  // let editMode = stateWithSetState[0]; //первый элемент массива значение
  // let setEditMode = stateWithSetState[1]; //второй элемент массива функция, изменяющая значение элемнта

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect( () => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || "No status"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onBlur={deactivateEditMode}
            autoFocus={true}
            value={status}
            onChange={onStatusChange}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileStatusWithHooks;
