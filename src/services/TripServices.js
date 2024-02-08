import axios from "axios";
import { apiEndpoint } from "../config";
import CookiesServices from "./CookiesServices";

//const expiresAt = 30;

let axiosConfig = {
  withCredentials: false,
};

class TripServices {
  constructor() {
    const token = CookiesServices.get("access-token");
    token ? (this.authenticated = true) : (this.authenticated = false);
  }
  //Get all trips from T4U 

  async getAllTripsFromT4U(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/trip/list`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async closeTrip(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/trip/closeTrip`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async updateMarketVehileNumber(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/trip/updateMarketVehicle`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  
  async getTripSummary(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/trip/summary/`+data,
        {},
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async unAssignVehicle(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/deassignedVehicle`,
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
const tripService = new TripServices();
export default tripService;
