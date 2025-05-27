import { useAuth } from "../services/useAuth";
import { useNavigate } from "react-router";
import { instance } from "../services/axiosApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";

function Profile() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [photoUrl, setPhotoUrl] = useState(null);
    const [file, setFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            profession: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(20, "Must be 10 characters or less")
                .required("Username is required"),
            name: Yup.string().required("Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(/[a-z]/, "Must contain at least one lowercase letter")
                .matches(/[A-Z]/, "Must contain at least one uppercase letter")
                .matches(/[0-9]/, "Must contain at least one number")
                .matches(
                    /[@$!%*?&]/,
                    "Must contain at least one special character"
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            profession: Yup.string().required("Profession is required"),
        }),
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem("accessToken");
                const payload = {
                    username: values.username.trim(),
                    name: values.name.trim(),
                    email: values.email.trim().toLowerCase(),
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    profession: values.profession.trim(),
                };

                const response = await instance.patch(
                    "api/update/profile",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status >= 200 && response.status < 300) {
                    alert("Profile updated successfully");
                } else {
                    alert("Failed to update profile");
                }
            } catch (error) {
                console.error(
                    "Update error:",
                    error.response?.data || error.message
                );
            }
        },
    });

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a photo");
            return;
        }

        const formData = new FormData();
        formData.append("picture", file);

        try {
            const res = await instance.post("/pic/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });
            console.log("Photo uploaded:", res.data);
            fetchPic(); // Refresh image after upload
        } catch (error) {
            console.error(
                "Photo upload failed:",
                error.response?.data || error.message
            );
        }
    };

    const fetchPic = async () => {
        try {
            const fetchResponse = await instance.get("/pic/picture", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });

            if (fetchResponse.data.picture) {
                setPhotoUrl(fetchResponse.data.picture);
                console.log(
                    "Photo URL fetched successfully:",
                    fetchResponse.data.picture
                );
            } else {
                console.warn("Picture not found in response");
            }
        } catch (error) {
            console.error(
                "Failed to fetch photo URL:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        fetchPic();
    }, []);

    return (
        <div className="px-20">
            <div className="flex items-center gap-10 my-10">
                <img
                    src={photoUrl}
                    alt="Profile"
                    className="size-30 ring-3 rounded-full"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="px-10 py-2 text-xl w-90 rounded-[6px] bg-black text-white"
                />
                <button
                    type="button"
                    onClick={handleUpload}
                    className="px-10 py-2 text-xl w-fit rounded-[6px] bg-black text-white"
                >
                    Upload
                </button>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <dl className="space-x-4 space-y-2">
                        <dd>Username</dd>
                        <dt>
                            <input
                                type="text"
                                placeholder="Enter Your Username"
                                {...formik.getFieldProps("username")}
                                className="px-2 border-2 border-black rounded-[6px] w-100 h-10"
                            />
                            {formik.touched.username &&
                                formik.errors.username && (
                                    <div className="text-red-600">
                                        {formik.errors.username}
                                    </div>
                                )}
                        </dt>

                        <dd>Profession</dd>
                        <dt>
                            <input
                                type="text"
                                placeholder="Enter Your Profession"
                                {...formik.getFieldProps("profession")}
                                className="px-2 border-2 border-black rounded-[6px] w-100 h-10"
                            />
                            {formik.touched.profession &&
                                formik.errors.profession && (
                                    <div className="text-red-600">
                                        {formik.errors.profession}
                                    </div>
                                )}
                        </dt>
                    </dl>
                </div>

                <div>
                    <dl className="space-x-4 space-y-2">
                        <dd>Full Name</dd>
                        <dt>
                            <input
                                type="text"
                                placeholder="Enter Your Full Name"
                                {...formik.getFieldProps("name")}
                                className="px-2 border-2 border-black rounded-[6px] w-100 h-10"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-600">
                                    {formik.errors.name}
                                </div>
                            )}
                        </dt>

                        <dd>Password</dd>
                        <dt>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                {...formik.getFieldProps("password")}
                                className="px-2 border-2 border-black rounded-[6px] w-100 h-10"
                            />
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <div className="text-red-600">
                                        {formik.errors.password}
                                    </div>
                                )}
                        </dt>
                    </dl>
                </div>

                <div>
                    <dl className="space-x-4 space-y-2">
                        <dd>Email</dd>
                        <dt>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                {...formik.getFieldProps("email")}
                                className="px-2 border-2 border-black rounded-[6px] w-100 h-10"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-600">
                                    {formik.errors.email}
                                </div>
                            )}
                        </dt>

                        <dd>Confirm Password</dd>
                        <dt>
                            <input
                                type="password"
                                placeholder="Enter Confirm Password"
                                {...formik.getFieldProps("confirmPassword")}
                                className="px-2 border-2 border-black rounded-[6px] w-100 h-10"
                            />
                            {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword && (
                                    <div className="text-red-600">
                                        {formik.errors.confirmPassword}
                                    </div>
                                )}
                        </dt>
                    </dl>
                </div>

                <div className="flex gap-5 my-10">
                    <button
                        type="submit"
                        className="px-10 py-2 text-xl rounded-[6px] bg-black text-white"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                        className="px-10 py-2 text-xl rounded-[6px] bg-black text-white"
                    >
                        Logout
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
