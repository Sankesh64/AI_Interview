import axios from "axios";
import { API_BASE_URL, INTERVIEW_ENDPOINTS } from "../util/constant";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const generateQuestions = async (jobTitle, jobDescription, resumeFile, mode = "demo") => {
  const formData = new FormData();
  formData.append("job_title", jobTitle);
  formData.append("job_description", jobDescription);
  formData.append("mode", mode);
  formData.append("resume", resumeFile);

  const response = await api.post(INTERVIEW_ENDPOINTS.GENERATE_QUESTION, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const startInterview = async (sessionId) => {
  const response = await api.get(`${INTERVIEW_ENDPOINTS.START}/${sessionId}`);
  return response.data;
};

export const submitAnswer = async (sessionId, answer, skip = false) => {
  const response = await api.post(INTERVIEW_ENDPOINTS.SUBMIT, {
    session_id: sessionId,
    answer,
    skip,
  });
  return response.data;
};

export const endInterview = async (sessionId) => {
  const response = await api.put(`${INTERVIEW_ENDPOINTS.END}/${sessionId}`);
  return response.data;
};

export const getReport = async (sessionId) => {
  const response = await api.get(`${INTERVIEW_ENDPOINTS.REPORT}/${sessionId}`);
  return response.data;
};
