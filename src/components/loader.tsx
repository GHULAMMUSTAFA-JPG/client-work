import React, { useState, useEffect } from "react";
import "./Loader.css";

const Loader = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">Loading{dots}</p>
    </div>
  );
};

export default Loader;
