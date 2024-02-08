import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class VehicleService {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }
  async getAllVehiclesList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/vehicle/list`,
        {},
        axiosConfig
      );
      console.log("Vehicle List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllVehiclesListByPlantCode(plantId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/vehicle/listPlantVehicle/` + plantId,
        {},
        axiosConfig
      );
      console.log("Vehicle List by Plant ID response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async listActiveTransportertVehicle(plantId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/vehicle/listActiveTransportertVehicle/` +
          plantId,
        {},
        axiosConfig
      );
      console.log("Vehicle List by Plant ID response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllGateInVehiclesList(plantId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/gatepass/gateInVehicles/` + plantId,
        {},
        axiosConfig
      );
      console.log("Vehicle List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getVehicleDetails(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/vehicle/` + data,
        {},
        axiosConfig
      );
      console.log("Vehicle Details response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getVehicleDetailsByTransporter(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/vehicle/listTransporterVehicle/` + data,
        {},
        axiosConfig
      );
      console.log("Vehicle Details response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getUnAssignedVehicleListByTransporter(data) {
    //get list of vehicle which are not in trip and gps fitted.

    console.log("t id", data);
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/trip/listTransporterVehicle/` + data,
        {},
        axiosConfig
      );
      console.log("Vehicle Details response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async addVehicle(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/vehicle/add`,
        data,
        axiosConfig
      );
      console.log("Add Vehicle response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async updateVehicle(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/vehicle/update`,
        data,
        axiosConfig
      );
      console.log("Add Vehicle response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getDriverByVehicle(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/vehicleDriver`,
        data,
        axiosConfig
      );
      console.log("GetDriver by Vehicle ID response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}

const vehicleServiceObj = new VehicleService();
export default vehicleServiceObj;
