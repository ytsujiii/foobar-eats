import axios, { AxiosRequestConfig } from "axios";
import Item from "./types/Item";

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
}
