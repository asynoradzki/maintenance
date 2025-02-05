import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/login/Login";
import Navbar from "../components/navbar/Navbar";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                {/* <Route index element={<MainPage />} />
                <Route path="sub" element={<SubPage />} /> */}
            </Route>
            <Route path="login" element={<Login />} />
        </Routes>
    );
};

export default AppRouter;
