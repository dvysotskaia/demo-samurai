import { authUserThunkCreator } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
    initialized: false
};

let appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccesAC = () => ({ type: INITIALIZED_SUCCESS });

//thunk Creator
export const initializeAppTnunkCreator = (id, email, login) => (dispatch) => {
  let promise = dispatch(authUserThunkCreator(id, email, login));

  Promise.all([promise]).then(() => {
     dispatch(initializedSuccesAC());
  })
 
};

export default appReducer;
