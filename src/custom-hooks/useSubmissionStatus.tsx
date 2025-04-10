// hooks/useSubmissionStatus.ts
import { useEffect, useState } from "react";

const SUBMISSION_KEY = "recordSubmitted";
const EXPIRY_MINUTES = 1;

const useSubmissionStatus = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(SUBMISSION_KEY);
    if (!data) return;

    const { time } = JSON.parse(data);
    const diff = (Date.now() - new Date(time).getTime()) / 60000;
    console.log("useeffect=>", diff >= EXPIRY_MINUTES);
    if (diff >= EXPIRY_MINUTES) {
      localStorage.removeItem(SUBMISSION_KEY);
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    const timeout = setTimeout(() => {
      localStorage.removeItem(SUBMISSION_KEY);
      setSubmitted(false);
    }, (EXPIRY_MINUTES - diff) * 60000);

    return () => clearTimeout(timeout);
  }, [submitted]);

  const submitValueHandler = () => {
    setSubmitted(true);
    const time = new Date().toISOString();
    localStorage.setItem(
      SUBMISSION_KEY,
      JSON.stringify({ submitted: true, time })
    );
    console.log("submitValueHandler==>", submitted);
  };

  console.log("==>", submitted);
  return { submitted, submitValueHandler,setSubmitted };
};

export default useSubmissionStatus;
