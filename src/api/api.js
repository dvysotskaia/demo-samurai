import axios from "axios";

// const baseUrl = `https://social-network.samuraijs.com/api/1.0/`;
export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId) {
    return instance.post(
      `follow/${userId}`
    );
  },
  unfollow(userId) {
    return instance.delete(
      `follow/${userId}`
    );
  },
  auth(id, email, login) {
    return instance.get(`auth/me`);
  },
  setProfile(userId) {
    console.log("Obsolete method. Please use profileAPI object! ");
    return profileAPI.setProfile(userId);
  }
};


export const profileAPI = {
  setProfile(userId) {
    return instance.get(
      `profile/${userId}`
    );
  },
  getStatus(userId) {
     return instance.get(
       `profile/status/${userId}`
     );
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status});
  }
};

export const authAPI = {
  // auth(id, email, login) {
  //   return instance.get(`auth/me`);
  // },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },

  logout() {
    return instance.delete(`auth/login`);
  },
};



const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "a7a326c2-c0ef-4fa8-8bf9-c891d9667f89",
  },
});
