"use server"

import { api } from "@/axios/api"
import { ACCESS_TOKEN } from "@/constant";

export async function Authenticate(token: string | undefined) {
  const response = api.GET('/auth', {
    headers: {
      cookie: `${ACCESS_TOKEN }=${token}`
    }
  });
  return response;
}