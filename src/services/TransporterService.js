import axios from "axios";
import { apiEndpoint } from "../config";

let axiosConfig = {
  withCredentials: true,
};

let axiosConfigHeader = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // Add any other headers if needed
  },
};

class TransporterService {
  // constructor(){
  //    // const token = CookiesServices.get('access-token')
  //    // token ? this.authenticated =true : this.authenticated=false;
  // }

  async addTransporter(data) {
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

  async getAllTransporter() {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/company/listByContext/transporter`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllTransporterByPlantId(plantId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/company/listChildren/` +
          plantId +
          `/transporter`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getAllTransporterByPlantRoute(roteID) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/routeTransporter/listByRouteId/` + roteID,
        {},
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async updaateTransporter(data) {
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
  async addPriceMaster(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/master/price/add`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getTransporterDeatails(userId) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/master/userTransporter/getUserTransporterByUserId/` +
          userId,

        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getFormInvoice(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoice/formInvoice`,
        data,
        axiosConfig
      );

      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addInvoice(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoice/addInvoice`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getInvoiceList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoice/listInvoice`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getInvoiceBasicInfo(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoice/listInvoiceBasicInfo`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getInvoiceById(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/invoice/getInvoice/` + id
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async updateInvoice(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoice/updateInvoice`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async InvoiceUpdateLevel1Status(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoice/updateLevel1Status`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async InvoiceUpdateLevel2Status(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoice/updateLevel2Status`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async InvoiceUpdateLevel3Status(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoice/updateLevel3Status`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async formDebitNote(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/debitNote/formDebitNote/` + id
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async addDebitNote(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/debitNote/addDebitNote`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getDNList(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/debitNote/listDebitNote`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async getDebitNoteById(data) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/debitNote/getDebitNoteById/` + data
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async updateDebitNote(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/debitNote/updateDebitNote`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async DebitNoteUpdateLevel1Status(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/debitNote/updateLevel1Status`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async DebitNoteUpdateLevel2Status(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/debitNote/updateLevel2Status`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async vehicleHistory(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/gps/vehicleHistoryTrack`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async vehicleActivity(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/gps/vehicleActivity`,
        data,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }

  async getInvoiceReportPFD(id) {
    try {
      const response = await axios.get(
        `${apiEndpoint}/planner/jasperReport/getInvoiceReportPFDView/` + id,
        { responseType: "arraybuffer" }
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }
  async uploadInvoiceDocument(data) {
    try {
      const response = await axios.post(
        `${apiEndpoint}/planner/invoiceDoc/uploadDocument`,
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

const transporterService = new TransporterService();

export default transporterService;
