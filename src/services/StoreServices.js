import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class storeServices {
  async addStore(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/store/add`,
        data,
        axiosConfig
      );
      //console.log("Store add API  response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getStoreList(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/store/listStoresOfCompany/` + id,
        {},
        axiosConfig
      );
      //console.log("Store API  response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async updateStore(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/store/update`,
        data,
        axiosConfig
      );
      console.log("Store Update API response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}
const storeServicesObj = new storeServices();
export default storeServicesObj;
