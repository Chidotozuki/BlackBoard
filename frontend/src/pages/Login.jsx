import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });

      login(res.data.token, res.data.user);

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed, please try again.";
      toast.error(message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <Mail className="w-5 h-5 opacity-70" />
            <input
              type="email"
              placeholder="Email"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <Lock className="w-5 h-5 opacity-70" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 opacity-70" />
              ) : (
                <Eye className="w-5 h-5 opacity-70" />
              )}
            </button>
          </label>
          <button className="btn btn-primary w-full">Login</button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
