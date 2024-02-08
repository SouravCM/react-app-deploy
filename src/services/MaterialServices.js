import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class MaterialServices {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }
  //Route Master

  async addMaterialMaster(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/material/add`,
        data,
        axiosConfig
      );
      //console.log("Add Material response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getMaterialList(plantId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/material/list/` + plantId,
        {},
        axiosConfig
      );
      //  console.log("Supplier List response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async uploadMaterialList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/file/uploadMaterial`,
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

  //API call for Update  Add Material
  async updateMaterialList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/material/update`,
        data,
        axiosConfig
      );
      console.log("Update Material API  response=>", response);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}

const MaterialServicesObj = new MaterialServices();
export default MaterialServicesObj;
