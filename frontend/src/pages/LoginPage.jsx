import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const benefits = [
    "Practice any role, anytime",
    "Get feedback in seconds",
    "Track your progress",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div
        style={{
          padding: "80px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            fontSize: 20,
            color: "#4f46e5",
            marginBottom: 64,
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
            }}
          >
            ✨
          </div>
          <span>interviewly</span>
        </div>

        <div style={{ maxWidth: 440 }}>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 20,
              color: "#0f172a",
            }}
          >
            Your next interview starts with practice.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Build confidence with realistic AI interviews and feedback that
            helps you improve.
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {benefits.map((b, i) => (
              <li
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#eef2ff",
                    color: "#4f46e5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <span style={{ color: "#334155" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 64px",
        }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            maxWidth: 440,
            padding: 40,
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p style={{ color: "#64748b", marginBottom: 28, fontSize: 14 }}>
            {mode === "login"
              ? "Sign in to continue your practice."
              : "Start practicing your interviews today."}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderRadius: 10,
              background: "#f1f5f9",
              padding: 4,
              marginBottom: 24,
            }}
          >
            <button
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 14,
                background: mode === "login" ? "white" : "transparent",
                color: mode === "login" ? "#0f172a" : "#64748b",
                boxShadow: mode === "login" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
              onClick={() => setMode("login")}
            >
              Log in
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 14,
                background: mode === "signup" ? "white" : "transparent",
                color: mode === "signup" ? "#0f172a" : "#64748b",
                boxShadow: mode === "signup" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
              onClick={() => setMode("signup")}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="label">Work email</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label className="label" style={{ margin: 0 }}>
                  Password
                </label>
                {mode === "login" && (
                  <a href="#" style={{ fontSize: 13, color: "#4f46e5", fontWeight: 500 }}>
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", marginTop: 8 }}
            >
              {mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: 12, color: "#94a3b8" }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <GoogleLoginButton style={{ borderRadius: 8, padding: "10px", width: "100%" }} />
          </div>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "#64748b" }}>
            {mode === "login" ? (
              <>
                New to interviewly?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("signup");
                  }}
                  style={{ color: "#4f46e5", fontWeight: 500 }}
                >
                  Create an account
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("login");
                  }}
                  style={{ color: "#4f46e5", fontWeight: 500 }}
                >
                  Log in
                </a>
              </>
            )}
          </p>

          <p
            style={{
              textAlign: "center",
              marginTop: 28,
              fontSize: 12,
              color: "#94a3b8",
              lineHeight: 1.5,
            }}
          >
            By continuing, you agree to our <a href="#" style={{ color: "#64748b" }}>Terms</a> and{" "}
            <a href="#" style={{ color: "#64748b" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
