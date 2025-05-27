import { useAuth } from "../services/useAuth";
import { useNavigate } from "react-router";
import { instance } from "../services/axiosApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";

function Profile() {
    const DEFAULT_PROFILE_IMAGE = 'https://github.com/codehariom/Click-Url-Full-Stack-Using-Mern/blob/3f80a7a223d67411c3a0a70c79cae7a997cfb65a/frontend/src/assets/logo.png';
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [photoUrl, setPhotoUrl] = useState(DEFAULT_PROFILE_IMAGE);
    const [file, setFile] = useState(false);
    

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

    // Verify the user is authenticated
    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("Please login to upload a profile picture");
        return;
    }

    // Decode token to get user info (if needed)
    // Note: This is client-side only and shouldn't contain sensitive data
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken?.sub || decodedToken?.userId;

    const formData = new FormData();
    formData.append("picture", file);
    
    // Add any additional server-required fields from token
    formData.append("userId", userId);

    try {
        const res = await instance.post("/pic/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200 || res.status === 201) {
            console.log("Photo uploaded:", res.data);
            // Handle successful upload
            if (res.data.picture) {
                setPhotoUrl(res.data.picture);
                alert("Profile picture updated successfully!");
            }
        } else {
            console.error("Unexpected response:", res);
            alert("Profile picture update failed");
        }
    } catch (error) {
        console.error("Upload error:", error);
        
        if (error.response) {
            if (error.response.status === 401) {
                alert("Session expired. Please login again.");
                // Handle logout or token refresh
            } else {
                alert(error.response.data?.message || "Upload failed");
            }
        } else {
            alert("Network error. Please try again.");
        }
    }
};

const fetchPic = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
        const response = await instance.get("/pic/picture", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data?.picture) {
            setPhotoUrl(response.data.picture);
        }
    } catch (error) {
        console.error("Error fetching profile picture:", error);
        // Set default image if fetch fails
        setPhotoUrl(DEFAULT_PROFILE_IMAGE);
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
