import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class RouteServices {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }
  //Route Master
  async getRoutesList(plantId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/route/listRouteByCompany/` + plantId,
        {},
        axiosConfig
      );
      // console.log("Supplier List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getListOfSuppliers(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/company/listChildren/` + data + "/Supplier",
        {},
        axiosConfig
      );
      // console.log("Supplier List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addRoute(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/route/add`,
        data,
        axiosConfig
      );
      //console.log("Add Route response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getRouteBasedonSelectedID(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/routeVendor/listByRouteId/` + id,
        {},
        axiosConfig
      );
      console.log("Route List based on ID  API response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  //Route Transporter
  async getRouteName(data) {
    try {
      const response = await axios.get(
        // `${apiEndpoint}/master/company/listChildren/` + data + "/Supplier",
        `${apiEndpoint}/master/route/listRouteByCompany/` + data,
        {},
        axiosConfig
      );
      // console.log("Route List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getTransporterName(data) {
    try {
      const response = await axios.get(
        // `${apiEndpoint}/master/company/listChildren/` + data + "/Supplier",
        `${apiEndpoint}/master/company/listChildren/` + data + "/transporter",
        {},
        axiosConfig
      );
      //console.log("Transporter List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addVendorRoute(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/routeVendor/add`,
        data,
        axiosConfig
      );
      //console.log("Add Route response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addTransporterRoute(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/routeTransporter/add`,
        data,
        axiosConfig
      );
      // console.log("Add Route response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllRouteVendorList(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/routeVendor/listByCompanyId/` + data,
        {},
        axiosConfig
      );
      // console.log("ouute Vendos List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllRouteTransporterList(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/routeTransporter/listByCompanyId/` + data,
        {},
        axiosConfig
      );
      // console.log("Supplier List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  //RouteVendor API Call
  async deleteRouteVendor(id) {
    try {
      const response = await axios.delete(
        `${apiEndpoint}/planner/routeVendor/` + id,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  //RouteTransporter API call
  async deleteRouteTransporter(id) {
    try {
      const response = await axios.delete(
        `${apiEndpoint}/planner/routeTransporter/` + id,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getListofRouteBasedonSelectedID(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/routeTransporter/listByRouteId/` + id,
        {},
        axiosConfig
      );
      // console.log("Route List based on ID  API response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}

const RouteServicesObj = new RouteServices();
export default RouteServicesObj;
