import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class FreightServices {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }
  //Route Master

  async addPremiumFreight(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/add`,
        data,
        axiosConfig
      );
      console.log("Add Freight response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async updatePremiumFreight(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/update`,
        data,
        axiosConfig
      );
      console.log("Add Freight response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getFreightApprovalLevel1(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/listLevel1`,
        data,
        axiosConfig
      );
      console.log("Freight List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getFreightApprovalLevel2(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/listLevel2`,
        data,
        axiosConfig
      );
      console.log("Freight List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getFreightList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/list`,
        data,
        axiosConfig
      );
      console.log("Freight List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getFreightListPending(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/listPending`,
        data,
        axiosConfig
      );
      console.log("Freight List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async approveRejectFrieght(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/level1Status`,
        data,
        axiosConfig
      );
      console.log("Freight Approval response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async approveRejectFrieghtLevel2(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/level2Status`,
        data,
        axiosConfig
      );
      console.log("Freight Approval Level 2 response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getFTMCostImapact(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/premiumFreight/utilizedCost`,
        data,
        axiosConfig
      );
      console.log("FTM Cost Freight response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}
const FreightServicesObj = new FreightServices();
export default FreightServicesObj;
