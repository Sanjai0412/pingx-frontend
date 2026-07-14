import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfileDetails from "../pages/userProfileDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import OtpVerification from "../pages/OtpVerification";
import TweetDetail from "../pages/TweetDetail";

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
          path="/user-details"
          element={
            <ProtectedRoute>
              <UserProfileDetails />
            </ProtectedRoute>
          }
        />
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tweets/:tweetId"
            element={
              <ProtectedRoute>
                <TweetDetail />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
