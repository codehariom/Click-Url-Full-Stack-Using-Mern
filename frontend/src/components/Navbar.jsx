import React from "react";
import logo from '../assets/logo.png';
import { Link,useNavigate } from "react-router-dom";
import  {useAuth}  from "../services/useAuth";

function Navbar() {
    const navigate = useNavigate();

    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="px-10 justify-center items-center relative bg-white">
            <nav className="flex justify-between max-auto py-4 items-center">
                <div className="w-35">
                    <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                <div className="flex gap-5 mx-5">
                    {!isAuthenticated ? (
                        <>
                            <button onClick={() => navigate("/login")} className="bg-white border-2 border-black rounded-[6px] w-[130px] h-[40px] hover:bg-black hover:text-white">Login</button>
                            <button onClick={() => navigate("/register")} className="bg-black text-white rounded-[6px] w-[130px] h-[40px] hover:border-black hover:border-2 hover:bg-white hover:text-black">Register Now</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/dashboard")} className="bg-white border-2 border-black rounded-[6px] w-[130px] h-[40px] hover:bg-black hover:text-white">Dashboard</button>
                            <button onClick={() => navigate("/profile")} className="bg-white border-2 border-black rounded-[6px] w-[130px] h-[40px] hover:bg-black hover:text-white">Profile</button>
                            <button onClick={() => { logout(); navigate("/login"); }} className="bg-white border-2 border-black rounded-[6px] w-[130px] h-[40px] hover:bg-black hover:text-white">Logout</button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
