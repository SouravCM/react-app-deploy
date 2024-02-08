import axios from "axios";
import { apiEndpoint } from "../config";
import moment from "moment";
import authService from "./AuthServices";

let axiosConfig = {
  withCredentials: false,
};

class GateInOutService {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }

  async getOut(id, remarks) {
    try {
      const userData = authService.getUserDetails();

      const response = await axios.post(
        `${apiEndpoint}/gatepass/update`,
        {
          id: id,
          remarks: remarks,
          exitTime: moment().format("YYYY-MM-DD HH:mm:ss"),
          gateOutCreatedBy: userData.id,
        },
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getGatePassByVehicleID(input) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/gatepass/notExitGatePassByVehicleId/` + input,
        {},
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getGatePass(input) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/findbyPassNo`,
        { passNo: input },
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getStoresList(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/store/listStoresOfCompany/` + data,
        {},
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async generateGatePass(
    companyId,
    vehicleId,
    driverId,
    entryTime,
    purpose,
    status,
    createdBy,
    stores
  ) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/add`,
        {
          companyId: companyId,
          vehicleId: vehicleId,
          driverId: driverId,
          entryTime: entryTime,
          purpose: purpose,
          status: status,
          createdBy: createdBy,
          stores: stores,
        },
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getGatePassListByVehicleAndDate(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/listAll`,
        data,
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async gatePassChangeStatus(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/changeStatus`,
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
const gateInOutService = new GateInOutService();
export default gateInOutService;
