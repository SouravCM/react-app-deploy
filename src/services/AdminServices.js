import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class AdminServices {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }
  //manage role
  async addManageRole(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/role/add`,
        data,
        axiosConfig
      );
      // console.log("Manage Role  response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getAllRoleList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/role/list`,
        {},
        axiosConfig
      );
      // console.log("Manage Role List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async updateManageRole(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/role/update`,
        data,
        axiosConfig
      );
      // console.log("Manage Role List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  //Manage Menu
  async addManageMenu(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/menu/add`,
        data,
        axiosConfig
      );
      // console.log("Manage Role  response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getAllManageMenuList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/menu/list`,
        {},
        axiosConfig
      );
      // console.log("Manage Role List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async updateManageMenu(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/menu/update`,
        data,
        axiosConfig
      );
      // console.log("Manage Menu List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  //Manage Page
  async addManagePage(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/page/add`,
        data,
        axiosConfig
      );
      // console.log("Manage Page  response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getAllMenuPageList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/page/list`,
        {},
        axiosConfig
      );
      // console.log("Manage Page List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async updateManagePage(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/page/update`,
        data,
        axiosConfig
      );
      // console.log("Manage Page List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  //Manage User
  async getRoleList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/role/list`,
        {},
        axiosConfig
      );
      // console.log("Role List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async addManageUser(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/user/add`,
        data,
        axiosConfig
      );
      // console.log("Manage User  response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllManagePageList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/user/list`,
        {},
        axiosConfig
      );
      // console.log("Manage User List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async updateManageUser(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/user/update`,
        data,
        axiosConfig
      );
      //  // console.log("Manage User List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  // Link User-Company Page
  async getUserName() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/user/list`,
        {},
        axiosConfig
      );
      //   // console.log("User List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getUserPlantList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/userCompany/list`,
        {},
        axiosConfig
      );
      // // console.log("User List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getCompanyByContext(context) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/company/listByContext/` + context,
        {},
        axiosConfig
      );
      //   // console.log("User List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async linkUserToPlant(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/userCompany/add`,
        data,
        axiosConfig
      );
      //   // console.log("User List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  //Link User Vendor
  async getUserVendorList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/userVendor/list`,
        {},
        axiosConfig
      );
      console.log("Vendor List API response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async linkUserToVendor(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/userVendor/add`,
        data,
        axiosConfig
      );
      //   // console.log("User List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async linkUserToTransporter(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/userTransporter/add`,
        data,
        axiosConfig
      );
      //   // console.log("User List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async deleteUserVendorLink(id) {
    try {
      const response = await axios.delete(
        `${apiEndpoint}/master/userVendor/` + id,
        {},
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async updateCompany(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/company/update`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async uploadCompanyByContext(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/file/uploadCompany`,
        data,
        axiosConfig
      );
      //console.log("Supplier List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getUserTransporterList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/userTransporter/list`,
        {},
        axiosConfig
      );
      //console.log("Vendor List API response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async deleteUserTransporterLink(id) {
    try {
      const response = await axios.delete(
        `${apiEndpoint}/master/userTransporter/deleteUserTransporter/` + id,
        {},
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getPriceList() {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/price/listPrice`,
        {},
        axiosConfig
      );
      //console.log("Vendor List API response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async deletePrice(id) {
    try {
      const response = await axios.delete(
        `${apiEndpoint}/master/price/deleteById/` + id,
        {},
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}

const AdminServicesObj = new AdminServices();
export default AdminServicesObj;
