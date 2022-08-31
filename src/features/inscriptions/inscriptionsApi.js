import axios from "axios";
import { axiosInstance } from "../config/axios";
import { inscriptionsapi } from "../config/requests";


export function GetInscriptions() {
    return axiosInstance
      .get(inscriptionsapi + "/")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }


  export function DeletetInscription(id) {
    return axiosInstance
      .delete(inscriptionsapi + "/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  export function Update(data) {
    return axiosInstance
      .put(inscriptionsapi+'/'+data.id , data.data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  export function Create(data) {
    return axiosInstance
      .post(inscriptionsapi, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }