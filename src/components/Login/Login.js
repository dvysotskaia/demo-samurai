import { connect } from "react-redux";
import Field from "redux-form/lib/Field";
import reduxForm from "redux-form/lib/reduxForm";
import { Input } from "../../common/FormsControls/FormsControls";
import { loginThunkCreator} from "../../redux/auth-reducer";
import { required } from "../../utils/validators/validators";
import "./Login.module.css";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import s from "./../../common/FormsControls/FormsControls.module.css";



function LoginForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          component={Input}
          name={"email"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          type={"password"}
          component={Input}
          name={"password"}
          validate={[required]}
        />
      </div>
      <div>
        <Field type={"checkbox"} component={"input"} name={"rememberMe"} />{" "}
        Remember me
      </div>
      <div>
        {props.error &&
        <div className={s.formSummeryError}>{props.error}</div>}
        <button>Log in</button>
      </div>
    </form>
  );
}

const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: "login",
})(LoginForm);



function Login(props) {
    const onSubmit = (formData) => {
      props.logIn(formData.email, formData.password, formData.rememberMe);
  };
  
  if (props.isAuth) {
    return <Navigate to={"/profile"} />
  }  
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};


let mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password, rememberMe) => {
      dispatch(loginThunkCreator(email, password, rememberMe));
    },
    // logOut: () => {
    //   dispatch(logoutThunkCreator());
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

  


