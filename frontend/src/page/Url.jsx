import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IoIosCopy } from "react-icons/io";
import { instance } from "../services/axiosApi";

function Url() {
    const [shortuUrl, setShortUrl] = useState();
    const [copied, setCopied] = useState(false);

    const formik = useFormik({
        initialValues: {
            original_url: "",
        },

        validationSchema: Yup.object({
            original_url: Yup.string().required(),
        }),

        onSubmit: async (value, { resetForm }) => {
            try {
                const response = await instance.post("/shorten", value);
                setShortUrl(response.data?.short_url);
                resetForm();
                setCopied(false);
            } catch (error) {
                if (error.response) {
                    console.error(
                        "Server responded with:",
                        error.response.data
                    );
                } else if (error.request) {
                    console.error("No response from server:", error.request);
                } else {
                    console.error("Request error:", error.message);
                }
            }
        },
    });

    const handelCopy = () => {
        navigator.clipboard.writeText(shortuUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <>
            <div className=" mx-40 my-15 0 flex  place-content-center  h-max  space-x-10 ">
                <div className=" border-3 border-black rounded-2xl w-full p-30  ">
                    <div className=" place-content-start  ">
                        <form
                            action=""
                            method="post"
                            onSubmit={formik.handleSubmit}
                        >
                            <dl className="space-y-4  w-full ">
                                <dt className=" text-2xl justify-self-start font-semibold">
                                    Enter Your Long URL
                                </dt>
                                <dd>
                                    <input
                                        type="url"
                                        placeholder="Enter Your Long Url"
                                        className="px-2 border-2 border-black rounded-[6px]  w-full  h-10"
                                        {...formik.getFieldProps(
                                            "original_url"
                                        )}
                                    />
                                    {formik.touched.original_url &&
                                    formik.errors.original_url ? (
                                        <div className=" text-left m-2 text-red-600">
                                            {formik.errors.original_url}
                                        </div>
                                    ) : null}
                                </dd>
                                <button
                                    type="submit"
                                    className="px-6 py-1  w-full text-xl  rounded-[6px] bg-black   items-center text-white"
                                >
                                    Get Your Short Link
                                </button>
                                {shortuUrl && (
                                    <div className="flex items-center gap-10">
                                        <p className="border-2 w-full rounded-[6px] px-10 py-2">
                                            {shortuUrl}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handelCopy}
                                            className="px-10 py-2 cursor-copy flex gap-2 text-xl rounded-[6px] bg-black items-center text-white"
                                        >
                                            {copied ? "Copied" : "Copy"}{" "}
                                            <IoIosCopy />
                                        </button>
                                    </div>
                                )}
                            </dl>
                        </form>
                    </div>
                </div>
                <div className="mx-30 place-content-center">
                    <h2 className="py-5 text-3xl">Supporting Benefits</h2>
                    <ul className="list-disc space-y-1.5 justify-self-center ">
                        <li>Custom branded short links</li>
                        <li>Real-time click tracking & analytics</li>
                        <li>QR code generation in one click</li>
                        <li>Mobile-friendly and lightning-fast</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Url;
