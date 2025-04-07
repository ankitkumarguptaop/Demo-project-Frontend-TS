import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signinUserService,
  signupUserService,
} from "../../services/auth.service";
import { SIGNIN, SIGNUP } from "./auth.type";

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  profilePic: File;
  role: "normal" | "admin" | "superadmin";
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePic?: string;
  };
}

export interface SignInPayload {
  email: string;
  password: string;
}

export const signUpUser = createAsyncThunk<AuthResponse, FormData>(
  SIGNUP,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await signupUserService(payload);
      const data: AuthResponse = response.data;
      console.log("Signup response data:", data);
      return data;
    } catch (error: any) {
      console.error("Signup error:", error);
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

export const signInUser = createAsyncThunk<AuthResponse, SignInPayload>(
  SIGNIN,
  async (payload:SignInPayload, { rejectWithValue }) => {
    try {
      const response = await signinUserService(payload);
      const data: AuthResponse = response.data;
      console.log("Signin response data:", data);
      return data;
    } catch (error: any) {
      console.error("Signin error:", error);
      return rejectWithValue(error.response?.data || "Signin failed");
    }
  }
);
