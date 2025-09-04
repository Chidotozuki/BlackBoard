import { useState } from "react";
import { Mail, Lock, User,Eye, EyeOff  } from "lucide-react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { Link,useNavigate } from "react-router";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/signup", {
      firstName,
      lastName,
      email,
      password,
    });

     toast.success("Account Created successfully!");
    navigate("/login")
  } catch (err) {
    const message =
      err.response?.data?.message || "Signup failed, please try again.";
    toast.error(message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <label className="input input-bordered flex items-center gap-2">
            <User className="w-5 h-5 opacity-70" />
            <input
              type="text"
              placeholder="First Name"
              className="grow"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <User className="w-5 h-5 opacity-70" />
            <input
              type="text"
              placeholder="Last Name"
              className="grow"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>

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

          <button className="btn btn-primary w-full">Sign Up</button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
