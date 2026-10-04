import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import StartInterview from "../components/StartInterview";
import Interview from "../components/Interview";
import Report from "../components/Report";
import Header from "../components/Header";
import Footer from "../components/Footer";

const InterviewPage = () => {
  const { sessionIdParam } = useParams();
  const location = useLocation();
  const [stage, setStage] = useState(() => {
    if (location.pathname.startsWith("/report/")) return "report";
    if (location.pathname.startsWith("/interview/") && sessionIdParam) return "interview";
    return "start";
  });
  const [sessionId, setSessionId] = useState(sessionIdParam || null);

  const handleSessionCreated = (id) => {
    setSessionId(id);
    setStage("interview");
  };

  const handleInterviewComplete = () => {
    setStage("report");
  };

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc" }}>
        {stage === "start" && <StartInterview onSessionCreated={handleSessionCreated} />}
        {stage === "interview" && sessionId && (
          <Interview sessionId={sessionId} onComplete={handleInterviewComplete} />
        )}
        {stage === "report" && sessionId && <Report sessionId={sessionId} />}
      </main>
      <Footer />
    </div>
  );
};

export default InterviewPage;
