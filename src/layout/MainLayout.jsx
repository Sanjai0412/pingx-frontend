import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import "./MainLayout.css";

const MainLayout = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="app-layout">
            <div className="sidebar-container">
                <Sidebar user={user} onLogout={handleLogout} />
            </div>
            <div className="page-container">
                <div className="page-content">
                    <main className="page-main">
                        <Outlet />
                    </main>
                </div>
            </div>
            <div className="right-sidebar">
                <div className="right-sidebar-title">Who to follow</div>
                <div className="right-sidebar-placeholder">Suggestions will appear here.</div>
            </div>
        </div>
    );
};

export default MainLayout;