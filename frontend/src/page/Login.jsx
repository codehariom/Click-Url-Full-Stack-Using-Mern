import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { instance } from "../services/axiosApi";
import { useAuth } from "../services/useAuth";

function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();


    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(20, "Username must be under 20 characters")
                .required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(/[a-z]/, "At least one lowercase letter required")
                .matches(/[A-Z]/, "At least one uppercase letter required")
                .matches(/[0-9]/, "At least one number required")
                .matches(
                    /[@$!%*?&]/,
                    "At least one special character required"
                ),
        }),

        onSubmit: async (values) => {
            try {
                const response = await instance.post("api/user/login", values);

                // console.log("Login success:", response.data);
                const token = response.data.accessToken;
                

                // Store token (if you get one)
                if (token) {
                    localStorage.setItem("accessToken", token); 
                    // console.log("Token saved:", token);
                    setIsAuthenticated(true);    
                    navigate("/dashboard");
                } else {
                    console.error("Token not found in response");
                }

                // Redirect to dashboard
                
            } catch (error) {
                console.error("Login error:", error);
                alert("Login failed. Please check your credentials.");
            }
        },
    });

    return (
        <>
            <div className="mx-10">
                <div className="gap-15 flex flex-wrap justify-between mx-30 my-10 columns-2 ">
                    <div className=" content-center items-start relative ">
                        <h2 className="text-xl my-5 sm:text-5xl font-semibold">
                            Login & Get Started ...
                        </h2>
                        <p className=" text-m sm:text-2xl text-gray-500">
                            See How It Works in 60 Seconds
                        </p>
                    </div>
                    <div className="bg-gray-100 p-10 rounded-xl max-w-md w-full">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label>Username *</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="w-full px-2 border-2 border-black rounded h-10"
                                        placeholder="Enter Username"
                                        {...formik.getFieldProps("username")}
                                    />
                                    {formik.touched.username &&
                                        formik.errors.username && (
                                            <div className="text-red-600">
                                                {formik.errors.username}
                                            </div>
                                        )}
                                </div>
                                <div>
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-2 border-2 border-black rounded h-10"
                                        placeholder="Enter Email"
                                        {...formik.getFieldProps("email")}
                                    />
                                    {formik.touched.email &&
                                        formik.errors.email && (
                                            <div className="text-red-600">
                                                {formik.errors.email}
                                            </div>
                                        )}
                                </div>
                                <div>
                                    <label>Password *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full px-2 border-2 border-black rounded h-10"
                                        placeholder="Enter Password"
                                        {...formik.getFieldProps("password")}
                                    />
                                    {formik.touched.password &&
                                        formik.errors.password && (
                                            <div className="text-red-600">
                                                {formik.errors.password}
                                            </div>
                                        )}
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="submit"
                                        className="w-[130px] h-[40px] text-xl rounded bg-black text-white"
                                    >
                                        Login
                                    </button>

                                    <Link to="/register">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/login")}
                                            className="w-[130px] h-[40px] text-xl rounded bg-black text-white"
                                        >
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
