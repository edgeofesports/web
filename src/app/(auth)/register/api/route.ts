"use server";
import { redirect } from "next/navigation";
// import { NextRequest } from "next/server";
import z from "zod";
import { FormState } from "../components/RegisterFrom";
import { NextResponse } from "next/server";
import { api } from "@/axios/api";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET() {
  const res = NextResponse.json({ hi: "hilo" });
  return res;
}

export async function registerFormAction(formData: FormData) {
  "use server";
  const schema = z.object({
    name: z
      .string({ message: "name required" })
      .min(2, { message: "name must be 2 character long" }),
    userName: z
      .string({ message: "username required" })
      .min(2, { message: "username must be 2 character long" }),
    email: z.email({ message: "Invalid Email" }),
    password: z
      .string({ message: "password required" })
      .min(6, { message: "password must be 6 character long" })
      .max(40, { message: "password should less than 40 character" }),
    otp: z.string({ message: "email otp required" }),
    confirmPassword: z.string({ message: "confirm password required" }),
    ffUserName: z.string().optional(),
    ffUid: z.string().optional(),
  });

  const parsedData = await schema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
    otp: formData.get("otp"),
    name: formData.get("name"),
    userName: formData.get("userName"),
    confirmPassword: formData.get("confirmPassword"),
    ffUserName: formData.get("ffUserName"),
    ffUid: formData.get("ffUid"),
  });

  if (!parsedData.success) {
    return { error: parsedData.error.issues[0] };
  }
  let shouldRedirect = false;
  try {
    const response = await api.POST<{ token: string }>("/user/auth/register", parsedData.data);
    console.log(response.data);
    if (!response.data?.token) {
      return { error: "Registration failed. Please try again." };
    }
    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token, {
      httpOnly: true,
      secure: false, // set to true if using HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    shouldRedirect = true;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    return (
      err.response?.data || { error: "Registration failed. Please try again." }
    );
  }
  if (shouldRedirect) {
    redirect("/");
  }
}

export async function sendOtpAction(email: string) {
  return await api.POST("/auth/send/verificationmail", {
    email,
  });
}
