import React, {Suspense} from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "../pages/Login";
import MainLayout from "../components/MainLayout";
import AllBookings from "../pages/AllBookings";

const Allroutes = () => {
    return (
        <Router basename={'/'} >
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/all-bookings" element={<MainLayout title={"All Bookings"}><AllBookings /></MainLayout>} />
            </Routes>
        </Router>
    )
}

export default Allroutes;