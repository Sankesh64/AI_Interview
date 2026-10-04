import React from "react";

const Footer = () => {
  return (
    <footer style={{ marginTop: "auto", padding: "32px 0", borderTop: "1px solid #e2e8f0" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p style={{ fontSize: 14, color: "#64748b" }}>© 2025 interviewly</p>
        <div style={{ display: "flex", gap: 32 }}>
          <a href="#" style={{ fontSize: 14, color: "#64748b" }}>
            Privacy
          </a>
          <a href="#" style={{ fontSize: 14, color: "#64748b" }}>
            Terms
          </a>
          <a href="#" style={{ fontSize: 14, color: "#64748b" }}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
