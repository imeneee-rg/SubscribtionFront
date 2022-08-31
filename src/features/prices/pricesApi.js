import { axiosInstance } from "../config/axios";
import { pricesapi } from "../config/requests";

export function getPrice(data) {
    return axiosInstance
      .get(pricesapi+'/'+data.product+'/'+data.period )
      .then((res) => {
        
        return res;
      })
      .catch((err) => {
        return err;
      });
  }