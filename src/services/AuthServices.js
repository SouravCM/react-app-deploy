import axios from "axios";
import { apiEndpoint } from "../config";
import CookiesServices from "./CookiesServices";
import LocalStorageService from "./LocalStorageService";

//const expiresAt = 30;

let axiosConfig = {
  withCredentials: false,
};

class AuthService {
  constructor() {
    const token = CookiesServices.get("access-token");
    token ? (this.authenticated = true) : (this.authenticated = false);
  }
  //Forgotpassword change password

  async updateForgotPassword(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/validate/updatePassword`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  //Forgot passsword
  async checkUserForForgotPassword(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/validate/forgotPassword`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  //Verify Login when login button is clicked. with username and password
  async ValidateUser(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/validate/login`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  isAuthenticated() {
    const token = CookiesServices.get("access-token");

    token ? (this.authenticated = true) : (this.authenticated = false);
    return true;
  }
  isAuthorised(roleid) {}

  async getUserCompany(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/userCompany/byUser/` + id,
        {},
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  //get User Child plants using company id
  async getPlantList(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/company/listChildren/` + id + `/plant`,
        {},
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  getUserDetails() {
    let data = CookiesServices.get("user");

    if (data) {
      return data;
    } else {
      return [];
    }
  }
  //Get User Menu details from Localstorage
  getUserMenuDetails() {
    let data = JSON.parse(LocalStorageService.getLocalStorage("userMenu"));

    if (data) {
      return data;
    } else {
      return [];
    }
  }
  //Get User Company deails from LocalStorage
  getUserCompanyDetails() {
    let data = JSON.parse(LocalStorageService.getLocalStorage("userCompany"));

    if (data) {
      return data;
    } else {
      return [];
    }
  }

  getSelectedPlant() {
    let data = CookiesServices.get("plant");

    if (data) {
      return data;
    } else {
      return [];
    }
  }
  //saving selected Plant
  savePlantInfo(plantInfo) {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 100 * 60 * 60 * 1000); // 24hrs in milliseconds

    const options = { path: "/", expires: expiryDate };
    // CookiesServices.set("access-token", response.token, options); //enable for token setting
    CookiesServices.set("plant", JSON.stringify(plantInfo), options);
    return true;
  }

  //saving usermenu inside localstorage
  handleLoginSuccess(response, remember) {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 100 * 60 * 60 * 1000); // 24hrs in milliseconds
    CookiesServices.set("user", JSON.stringify(response.responseBody.user), {
      path: "/",
      expires: expiryDate,
    });
    //save usermenu details into localstorage
    LocalStorageService.setLocalStorage(
      "userMenu",
      JSON.stringify(response.responseBody.menuPages)
    );

    return true;
  }

  saveVendorInfo(response) {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 100 * 60 * 60 * 1000); // 24hrs in milliseconds
    CookiesServices.set("vendor", JSON.stringify(response), {
      path: "/",
      expires: expiryDate,
    });

    return true;
  }

  getVendor() {
    let data = CookiesServices.get("vendor");

    if (data) {
      return data;
    } else {
      return [];
    }
  }

  saveTransporterInfo(response) {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 100 * 60 * 60 * 1000); // 24hrs in milliseconds
    CookiesServices.set("transporter", JSON.stringify(response), {
      path: "/",
      expires: expiryDate,
    });

    return true;
  }

  getTransporter() {
    let data = CookiesServices.get("transporter");

    if (data) {
      return data;
    } else {
      return [];
    }
  }

  //saving User Company details inside local storage
  handleCompany(company) {
    LocalStorageService.setLocalStorage("userCompany", JSON.stringify(company));
    return true;
  }
  //Logout
  async logout() {
    try {
      // CookiesServices.remove("access-token")
      CookiesServices.remove("user", { path: "/" });
      CookiesServices.remove("userMenu", { path: "/" });
      CookiesServices.remove("data", { path: "/" });
      CookiesServices.remove("plant", { path: "/" });
      CookiesServices.remove("vendor", { path: "/" });
      CookiesServices.remove("transporter", { path: "/" });
      LocalStorageService.clearStorage();
      console.log("After removal:", document.cookie);

      return true;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getUserProfile(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/admin/user/` + id,
        {},
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async updateProfile(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/user/update`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async changePassword(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/validate/changePassword`,
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
const authService = new AuthService();
export default authService;
