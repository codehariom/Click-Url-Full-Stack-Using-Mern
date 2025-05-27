import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import { instance } from "../services/axiosApi";

function Signup() {
    const navigate = useNavigate();

    const formik = useFormik({
        // intial value
        initialValues: {
            username: "",
            name: "",
            email: "",
            password: "",
        },

        //  validation using yup

        validationSchema: Yup.object({
            username: Yup.string()
                .max(20, "Must be 10 chracters or less")
                .required("Username is Required"),

            name: Yup.string().required("Name is required"),

            email: Yup.string()
                .email("Invalid email Address")
                .required("Email is Required"),

            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 character")
                .matches(
                    /[a-z]/,
                    "Password must contain at least one lowercase letter"
                )
                .matches(
                    /[A-Z]/,
                    "Password must contain at least one Upercase letter"
                )
                .matches(/[0-9]/, "Password must contain at least one Number")
                .matches(
                    /[@$!%*?&]/,
                    "Password must contain at least one special character"
                ),
        }),

        onSubmit: async (values) => {
            try {
                const payload = {
                    username: values.username.trim(),
                    name: values.name.trim(),
                    email: values.email.trim().toLowerCase(),
                    password: values.password,
                };
                const response = await instance.post(
                    "api/user/register",
                    payload
                );

                // console.log("Signup successful:", response.data);

                if (response.status >= 200 && response.status < 300) {
                    alert("Signup successful!");
                    navigate("/login");
                } else {
                    alert("Signup failed.");
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        alert(
                            "User already exists. Try a different username or email."
                        );
                    } else {
                        console.error("Eroor", error.response.data);
                        alert("Signup Faild Please Try Again");
                    }
                } else if (error.request) {
                    console.error("No response:", error.request);
                } else {
                    alert("An unexpected error occurred.");
                }
            }
        },
    });
    return (
        <>
            <div className="mx-20">
                <div className="gap-15 flex flex-wrap justify-between mx-20 my-10  columns-2 ">
                    <div className="content-center items-start relative">
                        <h2 className="text-xl place-content-center my-5 sm:text-5xl font-semibold">
                            Create an Account & <br />
                            Get Started ...
                        </h2>
                        <p className=" text-m sm:text-2xl text-gray-500">
                            Power Up Your Campaigns with Smarter Links
                        </p>
                    </div>
                    <div className="bg-gray-100 py-15  px-15 place-items-center rounded-xl">
                        <form
                            action="/"
                            method="post"
                            onSubmit={(e) => {
                                e.preventDefault();
                                formik.handleSubmit();
                            }}
                        >
                            <div>
                                <dl className="space-y-2">
                                    <dt>Username *</dt>
                                    <dd>
                                        <input
                                            type="text"
                                            className=" px-2 border-2 border-black rounded-[6px]  w-90  h-10"
                                            placeholder="Enter Username "
                                            {...formik.getFieldProps(
                                                "username"
                                            )}
                                        />
                                        {formik.touched.username &&
                                        formik.errors.password ? (
                                            <div className="text-red-600">
                                                {formik.errors.username}
                                            </div>
                                        ) : null}
                                    </dd>

                                    <dt>Name *</dt>
                                    <dd>
                                        <input
                                            type="text"
                                            className=" px-2 border-2 border-black rounded-[6px]  w-90  h-10"
                                            placeholder="Enter Full Name "
                                            {...formik.getFieldProps("name")}
                                        />
                                        {formik.touched.name &&
                                        formik.errors.name ? (
                                            <div className="text-red-600">
                                                {formik.errors.name}
                                            </div>
                                        ) : null}
                                    </dd>

                                    <dt>Email *</dt>
                                    <dd>
                                        <input
                                            type="email"
                                            className=" px-2 border-2 border-black rounded-[6px]  w-90  h-10"
                                            placeholder="Enter Email "
                                            {...formik.getFieldProps("email")}
                                        />
                                        {formik.touched.email &&
                                        formik.errors.email ? (
                                            <div className="text-red-600">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </dd>
                                    <dt>Password *</dt>
                                    <dd>
                                        <input
                                            type="password"
                                            className=" px-2 border-2 border-black rounded-[6px]  w-90  h-10"
                                            placeholder="Enter Password "
                                            {...formik.getFieldProps(
                                                "password"
                                            )}
                                        />
                                        {formik.touched.password &&
                                        formik.errors.password ? (
                                            <div className="text-red-600">
                                                {" "}
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                    </dd>
                                </dl>

                                <div className=" flex justify-between  my-5">
                                    <button
                                        type="submit"
                                        // onClick={() => navigate("/login")}
                                        value="Register"
                                        className=" w-[130px] h-[40px] text-xl  rounded-[6px] bg-black items-center text-white "
                                    >
                                        Register
                                    </button>

                                    <Link to="/login">
                                        <button className=" w-[130px] h-[40px] text-xl  rounded-[6px] bg-black items-center text-white ">
                                            Login
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

export default Signup;
