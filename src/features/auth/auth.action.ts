import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signinUserService,
  signupUserService,
} from "../../services/auth.service";
import { SIGNIN, SIGNUP } from "./auth.type";

export const signUpUser = createAsyncThunk(SIGNUP, async (payload , { rejectWithValue }) => {
  try {
  const response = await signupUserService(payload);
  const data = response.data;
  console.log("res data", data);
  return data;
  }
  catch(error:any){
    console.log(error)
    return rejectWithValue(error.response.data)
  }
});

export const signInUser = createAsyncThunk(SIGNIN, async (payload , { rejectWithValue }) => {
  try {
  const response = await signinUserService(payload);
  const data = response.data;
  console.log("res data", data);
  return data;
  }
  catch(error:any){
    console.log(error.response.data)
    return rejectWithValue(error.response.data)
  }
});