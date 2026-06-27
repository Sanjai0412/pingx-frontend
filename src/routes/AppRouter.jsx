import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfileDetails from "../pages/userProfileDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import OtpVerification from "../pages/OtpVerification";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
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
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <PublicRoute>
              <OtpVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-details"
          element={
            <ProtectedRoute>
              <UserProfileDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
