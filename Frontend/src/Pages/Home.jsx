import { UserRound, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ isAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(
    location.state?.user || JSON.parse(localStorage.getItem("user"))
  );

  // ✅ LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* ================= NAVBAR ================= */}
      <nav className="bg-slate-900 text-white px-6 md:px-10 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          PAYMENT
        </Link>

        {isAuth ? (
          <div className="relative">
            {/* USER ICON (TAP / CLICK) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2"
            >
              <span className="hidden md:block text-slate-200 font-medium">
                {user?.name}
              </span>
              <UserRound />
            </button>

            {/* DROPDOWN (MOBILE + DESKTOP) */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-md w-36 z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </nav>

      {/* ===== REST OF YOUR PAGE (UNCHANGED) ===== */}
      {/* (Hero, Features, CTA, Footer remain same) */}
    </div>
  );
};

export default Home;
