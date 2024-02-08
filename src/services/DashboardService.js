import axios from "axios";
import { apiEndpoint } from "../config";
import moment from "moment";

let axiosConfig = {
  withCredentials: false,
};

class DashboardService {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }

  async getDetentionVehiclesList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/listNotExit`,
        data,
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getSecurityCounts(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/gateDashboard`,
        data,
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getOut(id, remarks) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/update`,
        {
          id: id,
          remarks: remarks,
          exitTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
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
}
const dashboardService = new DashboardService();
export default dashboardService;
