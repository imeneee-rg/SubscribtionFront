import axios from "axios";
import { axiosInstance } from "../config/axios";
import { usersapi, clientsapi,periodsapi } from "../config/requests";


export function GetPeriods() {
    return axiosInstance
      .get(periodsapi + "/")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  export function Create(data) {
    return axiosInstance
      .post(periodsapi, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
  