import React, { useState } from "react";
import StartInterview from "../components/StartInterview";
import Interview from "../components/Interview";
import Report from "../components/Report";
import Header from "../components/Header";
import Footer from "../components/Footer";

const InterviewPage = () => {
  const [stage, setStage] = useState("start");
  const [sessionId, setSessionId] = useState(null);

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
