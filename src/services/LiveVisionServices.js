import axios from "axios";
import { apiEndpoint } from "../config";
import CookiesServices from "./CookiesServices";

//const expiresAt = 30;

let axiosConfig = {
  withCredentials: false,
};

class LiveVisionServices {
  constructor() {
    const token = CookiesServices.get("access-token");
    token ? (this.authenticated = true) : (this.authenticated = false);
  }
  //Get all trips from T4U

  async getVehiclesLocation(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/gps/list`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getGpsVehicleList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/gps/list`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getGSPSummary(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/gps/summary`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  isAuthenticated() {
    const token = CookiesServices.get("access-token");
    token ? (this.authenticated = true) : (this.authenticated = false);
    return true;
  }
  isAuthorised(roleid) {}
}
const tripService = new LiveVisionServices();
export default tripService;
