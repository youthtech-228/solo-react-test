import axios from 'axios'
export const API_BASE = 'http://localhost:5000';

export default class ApiService {
  /**
     * @param {string} url
     * @param {import('axios').AxiosRequestConfig} extra
     * @returns {Promise}
     */

  static async request (url, extra) {
    const headers = {}

    return axios({
      baseURL: API_BASE,
      url,
      headers,
      ...extra
    })
      .catch(err => {
        if (err?.response?.data?.message) {
          err.message = err.response.data.message
        }
        throw err
      })
  }

  static async getRepresentativesByState (state) {
    const res = await ApiService.request(`/representatives/${state}`);
    return res.data;
  }

  static async getSenatorsByState (state) {
    const res = await ApiService.request(`/senators/${state}`);
    return res.data;
  }
}