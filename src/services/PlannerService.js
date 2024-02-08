import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class PlannerService {
  async addPlan(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/add`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async updatePlan(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/update`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async assignVehicle(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/assignVehicle`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getPlanList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/list`,
        data,
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getPlanById(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/plan/` + data,
        {},
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getPlannerDashboard(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/dashboard`,
        data,
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getPlannerDashboardGate(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/gatepass/gatePassSummary`,
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
const plannerService = new PlannerService();
export default plannerService;
