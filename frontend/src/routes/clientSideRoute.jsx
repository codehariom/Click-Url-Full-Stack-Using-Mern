import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import Signup from "../page/Signup";
import Profile from "../page/Profile";
import Dashboard from "../page/Dashboard";
import Error404 from "../page/Error404";
import Url from "../page/Url";
import { AuthProvider } from "../services/authContext";
import Navbar from "../components/Navbar";
import PrivateRoute from "../routes/privateRoute";
import PublicRoute from "../routes/publicRoute";

function ClientSideRoute() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                {/* only show if not authenicated  */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                {/* When user logged in  Proccted route */}
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/short-url"
                    element={
                        <PrivateRoute>
                            <Url />
                        </PrivateRoute>
                    }
                />
                {/* This Routes For everyone */}
                <Route path="*" element={<Error404 />} />
            </Routes>
        </AuthProvider>
    );
}

export default ClientSideRoute;
