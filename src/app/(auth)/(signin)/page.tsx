"use client";
import React from "react";
import Input from "../../../components/input/input";
import { Box, Button, Typography } from "@mui/material";
import style from "./signin.module.css";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { FormControl } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import {  signInUser } from "@/features/auth/auth.action";
import { redirect } from "next/navigation";
import facebook from "../../../assets/images/Icon.png";
import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { AppDispatch } from "@/store/store";

const formSchema = z.object({
  email: z.string().email("Enter valid Email").min(1),
  password: z
    .string()
    .min(1, "Enter valid Password")
    .regex(
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/),
      "Enter valid Password"
    ),
});

type FormData = z.infer<typeof formSchema>;

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response: any = await dispatch<any>(
      signInUser({ email: data.email, password: data.password })
    );

    if (response?.meta?.requestStatus === "fulfilled") {
      enqueueSnackbar("Successfully Logged in", {
        variant: "success",
        autoHideDuration: 5000,
      });
      redirect("/home");
    }

    reset();
  };

  return (
    <FormControl className={style["form"]}>
      <Box sx={{ width: "90%" }}>
        <Input
          width="100%"
          lable="Email"
          register={register}
          feildName="email"
          margin="10px 0px"
          errors={errors}
        />
        <Input
          width="100%"
          lable="Password"
          margin="10px 0px"
          register={register}
          feildName="password"
          errors={errors}
        />
      </Box>

      <Box className={style["forgot-password"]}>
        <Typography
          alignSelf="right"
          variant="caption"
          color="#3797EF"
          fontSize={"12px"}
          fontWeight="medium"
        >
          Forgot password?
        </Typography>
      </Box>

      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#3797EF",
          width: "90%",
          height: "50px",
          borderRadius: "10px",
          textTransform: "none",
          marginTop: "20px",
        }}
      >
        Sign in
      </Button>

      <Box
        sx={{
          margin: "15px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "20px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 17,
            height: 17,
            paddingRight: 3,
          }}
        >
          <Image
            src={facebook}
            alt="facebook"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
        Log in with Facebook
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Box
          sx={{
            color: "#808080",
            borderTop: "1px solid #808080",
            width: "40%",
          }}
        ></Box>

        <Box
          sx={{
            color: "#808080",
            fontSize: "13px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          OR
        </Box>

        <Box
          sx={{
            color: "#808080",
            borderTop: "1px solid #808080",
            width: "40%",
          }}
        ></Box>
      </Box>

      <Box display={"flex"} color={"#808080"}>
        Don’t have an account?
        <Link
          href={"./signup"}
          style={{
            color: "#3797EF",
            textTransform: "none",
            textDecoration: "none",
            paddingLeft: "5px",
          }}
        >
          Sign up.
        </Link>
      </Box>

      <Box marginTop={20} color={"#808080"}>
        Instagram от Facebook
      </Box>
    </FormControl>
  );
};

export default SignIn;
