import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const Subscription = ({ user }) => {
  // user = { name: "Sanjay", email: "sanjay@example.com", avatar: "profile-image-url" }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Navbar */}
      <nav className="bg-slate-900 text-white px-6 md:px-10 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide cursor-pointer">PAYMENT</Link>

        {/* User Profile */}
        <div className="relative flex items-center gap-4 cursor-pointer group">
          <span className="hidden md:block text-slate-200 font-medium">{"user.name"}</span>
          <UserRound />
          <div className="absolute top-12 right-0 bg-gray-400 text-white px-5 py-1 rounded-md opacity-0 group-hover:opacity-100">
            Logout
          </div>
        </div>
      </nav>

      {/* Page Content */}
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

          {/* Basic Plan */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transform transition hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Basic</h2>
            <p className="text-slate-500 mb-6">Perfect for personal use</p>
            <span className="text-4xl font-bold text-blue-600 mb-6">
              299<span className="text-base font-normal">/month</span>
            </span>

            <ul className="mb-6 space-y-2 text-slate-600">
              <li>✅ Secure Payments</li>
              <li>✅ 100 Transactions/month</li>
              <li>✅ Email Support</li>
            </ul>

            <Link
              to="/payment"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Choose Basic
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center border-2 border-blue-600 transform transition hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Pro</h2>
            <p className="text-slate-500 mb-6">Best for growing businesses</p>
            <span className="text-4xl font-bold text-blue-600 mb-6">
              499<span className="text-base font-normal">/month</span>
            </span>

            <ul className="mb-6 space-y-2 text-slate-600">
              <li>✅ All Basic Features</li>
              <li>✅ Unlimited Transactions</li>
              <li>✅ Priority Support</li>
              <li>✅ Advanced Analytics</li>
            </ul>

            <Link
              to="/payment"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Choose Pro
            </Link>
          </div>

        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-slate-500 mt-12 max-w-md">
          Cancel anytime. No hidden fees. Your security is our priority.
        </p>
      </div>
    </div>
  );
};

export default Subscription;
