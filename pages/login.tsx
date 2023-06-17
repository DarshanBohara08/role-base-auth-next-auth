import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { IValue } from "../interfaces";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required").typeError("Email Required"),
  password: Yup.string().required("Required").typeError("Password Required"),
});

const Login = () => {
  const { data } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();
  const callbackUrl =
    data?.user?.role === "admin"
      ? "/admin/adminDashboard"
      : data?.user?.role === "user"
      ? "/user/userDashboard"
      : data?.user?.role === "store" && "store/storeDashboard";
  const handleSubmit = async (values: IValue): Promise<void> => {
    const result = await signIn("credentials", {
      email: values?.email,
      password: values?.password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    }

    if (result?.ok && callbackUrl) {
      router.push(callbackUrl);
    }
  };
  const initialValue = {
    email: "",
    password: "",
  };
  return (
    <div>
      <h1 className="text-center font-semibold text-5xl pt-8">
        Signin with your credential
      </h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values: IValue) => {
          handleSubmit(values);
          console.log("clciec");
        }}
      >
        {(formik) => {
          console.log("formik", formik?.errors);
          return (
            <Form className="flex flex-col justify-center items-center gap-10 py-9">
              <div className="flex flex-col gap-3 w-[30%]">
                <label className="text-2xl text-colorBlack font-medium">
                  Email
                </label>
                <Field
                  className="border border-gray-500 py-4 px-2 outline-none rounded-lg placeholder:text-xl"
                  name="email"
                  type="text"
                  placeholder="Enter Email"
                />
              </div>
              <div className="flex flex-col gap-3 w-[30%]">
                <label className="text-2xl text-colorBlack font-medium">
                  Password
                </label>
                <Field
                  className="border border-gray-500 py-4 px-2 outline-none rounded-lg placeholder:text-xl"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <p className="text-red-500">{error}</p>
              <button
                className="py-4 bg-gray-950 text-white px-20"
                type="submit"
              >
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
