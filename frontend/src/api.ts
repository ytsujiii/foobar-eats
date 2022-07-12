import axios, { AxiosRequestConfig } from "axios";
import Item from "./types/Item";
import Order from "./types/Order";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

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

  public static async getItems(): Promise<Item[]> {
    return await this.request({
      url: `/items`,
      method: "GET",
    });
  }

  public static async getItem(itemId: number): Promise<Item> {
    return await this.request({
      url: `/items/${itemId}`,
      method: "GET",
    });
  }

  public static async sendOrder(order: Order): Promise<Item> {
    return await this.request({
      url: `/order`,
      method: "POST",
      data: order,
    });
  }
}
