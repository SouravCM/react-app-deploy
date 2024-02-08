import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class VendorServices {
  async getVendorListByRouteID(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/routeVendor/listByRouteId/` + data,
        {},
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addVendor(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/company/add`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllVendorByPlantId(plantId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/company/listChildren/` + plantId + `/SUPPLIER`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addVendorMaterial(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/vendorMaterial/add`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getVendorMaterialListNew(plantId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/vendorMaterial/listByCompanyId/` + plantId,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getVendorMaterialList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/vendorUndispatchedMaterial`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async updateVendorDispatchDetails(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/dispatchDetails`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getDispatchReport(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/plan/vendorDispatchedMaterial`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getVendorDeatails(userId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/userVendor/byUser/` + userId,

        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async deleteVendorMaterial(id) {
    try {
      const response = await axios.delete(
        `${apiEndpoint}/planner/vendorMaterial/` + id,

        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getVendorBasedonSelectedID(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/vendorMaterial/listByVendorId/` + id,
        {},
        axiosConfig
      );
      console.log("Vendor List based on ID  API response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}

const vendorServices = new VendorServices();
export default vendorServices;
