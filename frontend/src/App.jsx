import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import ClientSideRoute from "./routes/clientSideRoute";
import { AuthProvider } from "./services/authContext";


function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/*" element={<ClientSideRoute />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
