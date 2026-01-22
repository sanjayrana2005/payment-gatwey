import { Save, UserRound } from "lucide-react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { userContext } from "../Context/UserContext";

const Subscription = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser,setAuth } = useContext(userContext)

  // LOGOUT HANDLER (Works on mobile + desktop)
  const logoutHandle = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      // Redirect to login
      navigate("/");
      setUser(null)
      setAuth(false)
      localStorage.removeItem("user")
      toast.success(data.message);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSubscription = async (planType) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/order`,
        {
          planType
        }, {
        withCredentials: true
      }
      )
      const { amount, currency, orderId, notes } = data.saveOrder;
      const options = {
        key: data.key_id, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits.
        currency,
        name: "Payment",
        description: 'Pay to get subscription',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.name,
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }


  return (
    user?.isPremium ? (<>
      <nav className="bg-slate-900 text-white px-6 md:px-10 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          PAYMENT
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 focus:outline-none "
          >
            <span className="hidden md:block text-slate-200">
              {user?.name || "User"}
            </span>
            <UserRound className="cursor-pointer" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white text-slate-800 rounded-lg shadow-lg w-36 z-50">
              <button
                onClick={logoutHandle}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Subscription Active</h1>
          <p className="text-slate-700 mb-6">
            You already have the <span className="font-semibold">{user?.planType == "basic" ? "Basic" : "Pro"}</span> subscription.
          </p>
          <p className="text-slate-500 mb-6">
            No need to pay again. You can enjoy all the features of your current plan.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div></>) :
      (<div className="min-h-screen bg-slate-100 flex flex-col">
        <nav className="bg-slate-900 text-white px-6 md:px-10 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            PAYMENT
          </Link>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 focus:outline-none "
            >
              <span className="hidden md:block text-slate-200">
                {user?.name || "User"}
              </span>
              <UserRound className="cursor-pointer" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white text-slate-800 rounded-lg shadow-lg w-36 z-50">
                <button
                  onClick={logoutHandle}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="flex flex-col items-center px-4 py-12">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-3">
              Choose Your Plan
            </h1>
            <p className="text-slate-500 max-w-md mx-auto">
              Pick a plan that fits your business. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>

          {/* Plans */}
          <div className="grid gap-8 sm:grid-cols-2 w-full max-w-4xl">
            {/* BASIC PLAN */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transform transition hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-2 text-slate-800">Basic</h2>
              <p className="text-slate-500 mb-6">Perfect for personal use</p>
              <span className="text-4xl font-bold text-blue-600 mb-6">
                ₹299<span className="text-base font-normal">/month</span>
              </span>

              <ul className="mb-6 space-y-2 text-slate-600">
                <li>✅ Secure Payments</li>
                <li>✅ 100 Transactions/month</li>
                <li>✅ Email Support</li>
              </ul>

              <button onClick={() => handleSubscription("basic")}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-3 px-8 rounded-xl font-semibold transition transform hover:scale-105"
              >
                Choose Basic
              </button>
            </div>

            {/* PRO PLAN */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center border-2 border-blue-600 transform transition hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-2 text-slate-800">Pro</h2>
              <p className="text-slate-500 mb-6">Best for growing businesses</p>
              <span className="text-4xl font-bold text-blue-600 mb-6">
                ₹499<span className="text-base font-normal">/month</span>
              </span>

              <ul className="mb-6 space-y-2 text-slate-600">
                <li>✅ All Basic Features</li>
                <li>✅ Unlimited Transactions</li>
                <li>✅ Priority Support</li>
                <li>✅ Advanced Analytics</li>
              </ul>

              <button onClick={() => handleSubscription("pro")}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-3 px-8 rounded-xl font-semibold transition transform hover:scale-105"
              >
                Choose Pro
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-12 max-w-md">
            Cancel anytime. No hidden fees. Your security is our priority.
          </p>
        </div>
      </div>)
  );
};

export default Subscription;
