import { Link, useNavigate } from "react-router";
import { PlusIcon, UserCircle2, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
  

const Navbar = () => {
  const { user,logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect to login
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            BlackBoard
          </h1>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>

            {/* Profile dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <UserCircle2 className="size-7" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li>
                  <Link to="/profile">
                    <UserCircle2 className="size-4" /> Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <LogOut className="size-4" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
