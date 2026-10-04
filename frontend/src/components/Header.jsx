import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../services/auth";
import GoogleLoginButton from "./GoogleLoginButton";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => console.error("Error fetching user session:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(248, 250, 252, 0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            fontSize: 18,
            color: "#0f172a",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 16,
            }}
          >
            ✨
          </div>
          <span>interviewly</span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <a href="/#how" style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>
            How it works
          </a>
          <a href="/#practice" style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>
            Practice
          </a>
          <a href="/#resources" style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>
            Resources
          </a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {loading ? (
            <span style={{ fontSize: 14, color: "#64748b" }}>Loading...</span>
          ) : user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name || "User Profile"}
                  style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#4f46e5",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                  }}
                >
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
                {user.name || user.email}
              </span>
              <button
                className="btn btn-ghost"
                onClick={handleLogout}
                style={{ fontSize: 14 }}
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <GoogleLoginButton style={{ padding: "8px 14px", fontSize: 14 }} />
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Get started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
