import axios from "axios";

export const signupUserService = async (data) =>{
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
    data,
  );
}

export const signinUserService = async (data) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
    data,
  );