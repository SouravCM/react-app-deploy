import { Cookies } from "react-cookie";
const cookies = new Cookies();

class CookiesServices {
  get(key) {
    return cookies.get(key);
  }
  set(key, value, options) {
    return cookies.set(key, value, options);
  }
  remove(key, options) {
    try {
      cookies.remove(key, options);
      console.log(`Cookie "${key}" removed successfully.`);
    } catch (error) {
      console.error(`Error removing cookie "${key}":`, error);
    }
  }
  destroy() {
    //  cookies.remove();
  }
}
const cookiesService = new CookiesServices();
export default cookiesService;
