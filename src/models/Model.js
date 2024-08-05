import { Model as BaseModel } from "vue-api-query";
import axios from "axios";

export default class Model extends BaseModel {
  constructor() {
    super();
    this.axios = axios;
  }

  baseURL() {
     //const url = "https://localhost:7171";
     const url = "https://libratech-g5fachevhpfjcred.eastus-01.azurewebsites.net/";
    try {
      new URL(url);
    } catch (_) {
      console.error('URL base nao formatada corretamente:', url);
      return;
    }
    return url;
  }

  request(config) {
    const instance = this.axios.create({
      baseURL: this.baseURL()
    });

    return instance.request(config);
  }
}