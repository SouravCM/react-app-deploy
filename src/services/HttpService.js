import http from "../plugin/http";

class HttpService {
  constructor() {
    this.authorizedAxios = http;
  }
  
  get(url, data) {
    return this.authorizedAxios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log("request error", error);
        return false;
      });
  }
  post(url, data) {
    return this.authorizedAxios
      .post(url, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("error", err);
        return false;
      });
  }
}

export default HttpService;
