import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

class MaterialService {
  async getMaterialListByVendorId(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/vendorMaterial/listByVendorId/` + data,
        {},
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
}
const materialService = new MaterialService();
export default materialService;
