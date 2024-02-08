import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class DriverService {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }
  async getDriverByLicense(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/driver/findbyLicenseNo`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllDrivers() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/driver/list`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addDriver(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/driver/add`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async updateDriver(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/driver/update`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}
const driverService = new DriverService();

export default driverService;
