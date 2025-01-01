import React, { useEffect, useState } from "react";
import './Loader.css'
const Loader = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Prevent scrolling when the loader is active
    document.body.style.overflow = "hidden";

    // Cleanup: Restore scrolling when loader is removed
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text" style={{color:'blue'}}>{dots}</p>
    </div>
  );
};

export default Loader;