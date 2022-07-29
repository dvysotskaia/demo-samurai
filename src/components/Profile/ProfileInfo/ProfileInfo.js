import Preloader from "../../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/user.jpg";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


function ProfileInfo(props) {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <img
        className={s.main_bg}
        src="https://krot.info/uploads/posts/2021-02/1613470746_67-p-fon-s-nezhno-rozovimi-oblakami-67.jpg"
        alt=""
      /> */}
      <div>
        {}
        <img
          src={
            props.profile.photos.large != null
              ? props.profile.photos.large
              : userPhoto
          }
        />
        <div>{props.profile.fullName}</div>
        <div>{props.profile.aboutMe}</div>
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
}

export default ProfileInfo;
