// import { ApiResponse } from "@/global.types";
import axios, { AxiosInstance, AxiosRequestConfig, RawAxiosResponseHeaders } from "axios";
const serverUrl = "https://edgeofesports.onrender.com/";

export const ENDPOINTS = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

/**
 * CLASS API
 */
class Api {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: serverUrl,
      withCredentials: true,
      validateStatus: () => true,
      headers: {
        "Content-Type": "application/json",
        "apikey": "123@edgeofwaresports.com"
      },
    });
  }

  async GET<T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<ApiResponse<T>> {
    try {
      const res = await this.api.get<ApiResponse<T>>(url, config);
      return res.data;
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Network error",
        data: null as any,
      };
    }
  }

  async POST<T>(
    url: string,
    payload: Record<string, unknown>,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<ApiResponse<T>> {
    try {
      const res = await this.api.post<ApiResponse<T>>(url, payload, config);
      return res.data;
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Network error",
        data: null as any,
      };
    }
  }
}

/**
 * INITIALIZE API
 */
export const api = new Api();
