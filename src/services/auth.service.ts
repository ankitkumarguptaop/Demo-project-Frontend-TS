import { SignInPayload, SignUpPayload } from "@/features/auth/auth.action";
import axios from "axios";

export const signupUserService = async (data:FormData) =>{
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
    data,
  );
}

export const signinUserService = async (data:SignInPayload) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
    data,
  );