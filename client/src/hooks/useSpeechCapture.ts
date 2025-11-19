import { useCallback, useMemo, useRef, useState } from "react";

type SpeechRecognitionCtor = new () => SpeechRecognition;

const getRecognitionCtor = (): SpeechRecognitionCtor | null => {
  if (typeof window === "undefined") return null;
  const w = window as typeof window & {
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

export const useSpeechCapture = () => {
  const Recognition = useMemo(getRecognitionCtor, []);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(() => {
    if (!Recognition) {
      setError("Speech input is not supported in this browser.");
      return;
    }
    if (isListening) return;

    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const latest = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ");
      setTranscript(latest);
    };

    recognition.onerror = (evt: SpeechRecognitionErrorEvent) => {
      setError(evt.error ?? "Speech input error");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setTranscript("");
    setError(null);
    setIsListening(true);
  }, [Recognition, isListening]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }, []);

  return {
    isSupported: Boolean(Recognition),
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
  };
};
