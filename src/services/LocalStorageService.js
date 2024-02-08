class LocalStorageService{

    // constructor(){

    // }
    setLocalStorage(key,value){
      return localStorage.setItem(key,value)
    }
    getLocalStorage(key){
        return localStorage.getItem(key);
    }
    clearStorage(){
      return localStorage.clear();
    }
}

const localStorageObj = new LocalStorageService();
export default localStorageObj;