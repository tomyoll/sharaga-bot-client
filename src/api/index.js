import axios from "axios";
import { REQUEST_RESPONSES } from "../constants";
class Api {
  constructor() {
    this.loginUrl = "/login";
  }

  post({ path = "", data = {} }) {
    return this._send({ method: "POST", path, data });
  }

  put({ path = "", data = {} }) {
    return this._send({ method: "PUT", path, data });
  }

  get({
    path = "",
    data = {},
    params = {},
    responseType = "json",
    fullResponse = false,
  }) {
    return this._send({
      method: "GET",
      path,
      data,
      params,
      responseType,
      fullResponse,
    });
  }

  delete({ path = "" }) {
    return this._send({ method: "DELETE", path });
  }

  async _send({
    method = "GET",
    path = "",
    data = {},
    params = {},
    responseType = "json",
    fullResponse = false,
  }) {
    const headers = {};

    //const token = localStorage.getItem("token");

    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    try {
      const response = await axios({
        method,
        url: `${process.env.REACT_APP_API_URL}${path}`,
        params,
        data,
        headers,
        responseType,
      });

      if (fullResponse) {
        return response;
      }

      if (response && response.data) {
        return response.data;
      }

      return null;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = this.loginUrl;
      }

      console.log(error);

      if (error.response) {
        throw { error: error.response.data.error };
      }

      if (error.request) {
        throw { error: REQUEST_RESPONSES.NO_RESPONSE };
      }
      throw { error: error.message };
    }
  }
}

export default new Api();
