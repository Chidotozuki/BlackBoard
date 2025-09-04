import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-error">No user data available. Please login.</p>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>


            <div className="card bg-base-100 mb-6">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Profile</h2>
                <p>
                  <span className="font-semibold">First Name:</span>{" "}
                  {user.firstName || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Last Name:</span>{" "}
                  {user.lastName || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {user.email || "N/A"}
                </p>
              </div>
            </div>
            {/* change password later */}
            {/* <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Change Password</h2>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
