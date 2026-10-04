export const speakText = (text, onEnd) => {
  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported");
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.lang = "en-US";

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

export const isSpeechSupported = () => {
  return (
    "speechSynthesis" in window && "webkitSpeechRecognition" in window
  );
};
