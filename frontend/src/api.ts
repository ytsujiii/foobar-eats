import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

type EmptyObject = Record<string, never>;

export default class Api {
  private static async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await client.request(config);
    return response.data;
  }

  public static async getCustomerInfo(customerId: number) {
    return await this.request({
      url: `/customer/${customerId}`,
      method: "GET",
    });
  }

  public static async getItem1() {
    return Promise.resolve({
      id: 1,
      name: "this is item1",
    });
    return await this.request({
      url: `/customer/`,
      method: "GET",
    });
  }
}
