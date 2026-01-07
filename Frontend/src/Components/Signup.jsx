import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo =useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,{
                name,email,password
            });

            if(data){
                setLoading(false);
                toast.success(data.message);
                navigateTo("/");
            }
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
                    <p className="text-slate-500 mt-2 text-sm">
                        Sign up to start accepting payments securely
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSignup}>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-600 mb-1">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            />

                            {/* Eye Toggle */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>


                    {/* Login Button */}
                    <button

                        onClick={()=>setLoading(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
                    >
                        {
                            loading ? "Creating..." : "Create Account"
                        }
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
