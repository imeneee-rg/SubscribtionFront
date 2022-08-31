import axios from "axios";
import { axiosInstance } from "../config/axios";
import { usersapi, clientsapi } from "../config/requests";


export function GetUsers() {
    return axiosInstance
      .get(usersapi + "/")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  export function DeletetUser(id) {
    return axiosInstance
      .delete(usersapi + "/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  export function CreateUser(data) {
    return axiosInstance
      .post(clientsapi, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }


  export function Login(data) {
    return axios
      .post(usersapi + "/login", data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }


  export function GetMe() {
    return axiosInstance
      .get(usersapi + "/me")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  export function UpdateUser(data) {
    return axiosInstance
      .put(usersapi+'/'+data.id ,data.data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }