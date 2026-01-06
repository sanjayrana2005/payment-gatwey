import { UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ isAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [user] = useState(
    location.state?.user || JSON.parse(localStorage.getItem("user"))
  );

  // ✅ LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      setMenuOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="bg-slate-900 text-white px-6 md:px-10 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          PAYMENT
        </Link>

        {isAuth ? (
          <div className="relative">
            {/* USER ICON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2"
            >
              <span className="hidden md:block text-slate-200 font-medium">
                {user?.name}
              </span>
              <UserRound className="cursor-pointer"/>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40 z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                >
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

      <section className="flex flex-col items-center text-center px-4 sm:px-6 py-16 sm:py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Secure & Seamless <br className="sm:hidden" />
          <span className="text-green-300">Payment Gateway</span>
        </h2>

        <p className="max-w-xl md:max-w-2xl text-base sm:text-lg text-blue-100 mb-8">
          Accept online payments with enterprise-grade security, fast processing,
          and easy integration for developers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/subscription"
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition text-center"
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="w-full sm:w-auto border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition text-center"
          >
            Learn More
          </a>
        </div>
      </section>

      <section
        id="features"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-10 py-20"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-3">🔒 Bank-Grade Security</h3>
          <p className="text-gray-600">
            JWT authentication, HTTPS enforcement, and encrypted payment flow.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-3">⚡ Lightning Fast</h3>
          <p className="text-gray-600">
            Optimized APIs for real-time payment processing and confirmations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-3">🧩 Developer Friendly</h3>
          <p className="text-gray-600">
            Clean REST APIs, cookie-based auth, and simple integration.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center text-center px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Secure & Seamless{" "}
          <span className="text-green-300 block sm:inline">
            Payment Gateway
          </span>
        </h2>

        <p className="max-w-xl sm:max-w-2xl text-base sm:text-lg text-blue-100 mb-8">
          Accept online payments with enterprise-grade security, fast processing,
          and easy integration for developers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/subscription"
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition text-center"
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="w-full sm:w-auto border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition text-center"
          >
            Learn More
          </a>
        </div>
      </section>

      <footer className="mt-auto bg-slate-950 text-gray-400 text-center py-4">
        © {new Date().getFullYear()} Payment. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
