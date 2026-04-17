"use server";
import { api } from "@/axios/api";
import { ACCESS_TOKEN } from "@/constant";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  const res = NextResponse.json({ hi: "hilo" });
  return res;
}

export async function loginFormAction(
  state: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  "use server";
  const schema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z
      .string({ message: "password required" })
      .min(3, { message: "password must be more than 3 character." })
      .max(50, { message: "password must be less than 50 character." }),
  });

  // await wait();

  const parsedData = await schema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedData.success) {
    return { error: parsedData.error.issues[0].message };
  }

  try {
    const axiosRes = await api.POST<{token: string}>("/user/auth/login", {
      email: parsedData.data.email,
      password: parsedData.data.password,
    });

    if(!axiosRes.success) {
      return { error: axiosRes.error ||  axiosRes.message || "Login failed" };
    }
    
    if(!axiosRes.data?.token) {
      return { error: "Token not received from server" };
    }
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN, axiosRes.data?.token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: false,
    });
  } catch (error) {
    const err = error as AxiosError;
    return {
      error:
        (err.response?.data as { error: string })?.error || "An error occurred",
    };
  }
  revalidatePath("/", 'layout')
  redirect("/");
}
