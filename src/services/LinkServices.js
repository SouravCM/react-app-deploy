import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class LinkServices {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }

  //Link Menu Page
  async getMenuList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/menu/list`,
        {},
        axiosConfig
      );
      // console.log("Menu List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getPageList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/page/list`,
        {},
        axiosConfig
      );
      // console.log("Page List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getPageListBasedonSelectedID(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/menuPage/listByMenuId/` + data,
        {},
        axiosConfig
      );
      // console.log("Page List based on ID response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async handleRightButton(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/menuPage/add`,
        data,
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  //LinkRole Menu

  async getRoleList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/role/list`,
        {},
        axiosConfig
      );
      // console.log("Role List response for Dropdwn=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllMenuList() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/menu/list`,
        {},
        axiosConfig
      );
      // console.log("Menu List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getListMenuBasedonSelectedID(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/roleMenu/listByRoleId/` + data,
        {},
        axiosConfig
      );
      // console.log("Page List based on ID response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async handleRightButtonforRoleMenu(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/roleMenu/add`,
        data,
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  //Link Role Page

  async getRoleListForRolePage() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/role/list`,
        {},
        axiosConfig
      );
      // console.log("Role List response for Dropdwn=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllPageListForRolePage() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/page/list`,
        {},
        axiosConfig
      );
      // console.log("Page List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getListRolePageBasedonSelectedID(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/rolePage/listByRoleId/` + data,
        {},
        axiosConfig
      );
      // console.log("Page List based on ID response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async handleRightButtonforRolePage(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/rolePage/add`,
        data,
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async addLinkMenuRoleBatch(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/roleMenu/addBatch`,
        data,
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async addLinkRolePageBatch(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/rolePage/addBatch`,
        data,
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addLinkMEnuPageBatch(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/menuPage/addBatch`,
        data,
        axiosConfig
      );
      // console.log("Add handleRightButton response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async deleteUserPlaneLink(id) {
    try {
      const response = await axios.delete(
        `${apiEndpoint}/master/userCompany/` + id,
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
  async uploadLinkRouteTransporter(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/file/uploadRouteTransporter`,
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
  async uploadLinkRouteVendor(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/file/uploadRouteVendor`,
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
  async uploadLinkVendorMaterial(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/file/uploadVendorMaterial`,
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
}

const LinkServicesObj = new LinkServices();
export default LinkServicesObj;
