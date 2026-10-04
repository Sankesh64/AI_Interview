import React from "react";
import { PropagateLoader, PulseLoader, ScaleLoader } from "react-spinners";

const LoaderScreen = ({ title = "Processing...", subtitle = "Please wait a moment while we process your request.", type = "propagate" }) => {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      <div
        className="card"
        style={{
          padding: "48px 40px",
          maxWidth: 480,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          borderRadius: 20,
        }}
      >
        <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {type === "pulse" && <PulseLoader color="#4f46e5" size={14} speedMultiplier={0.8} />}
          {type === "scale" && <ScaleLoader color="#6366f1" height={35} width={4} radius={2} margin={3} />}
          {type === "propagate" && <PropagateLoader color="#4f46e5" size={15} speedMultiplier={0.8} />}
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>
            {title}
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoaderScreen;
