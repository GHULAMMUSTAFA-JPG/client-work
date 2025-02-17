import React from "react";
import Link from "next/link";

interface Step {
  title: string;
  description: string;
  icon: string;
  link?: string;
}

interface HowItWorksProps {
  steps: Step[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({ steps }) => {
  const handleClick = (link?: string) => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div className="card border-1 rounded-lg p-3">
      <h2 className="text-dark fw-bold mb-3 text-center" style={{ fontSize: "1.1rem" }}>
        How It Works
      </h2>
      <div className="row gy-3">
        {steps.map((step, index) => (
          <div key={index} className="col-md-4 text-center">
            {/* Icon */}
            <div
              className={`d-flex justify-content-center align-items-center mx-auto mb-2 ${
                step.link ? "cursor-pointer" : ""
              }`}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#16a085",
                color: "white",
                fontSize: "1.4rem",
              }}
              onClick={() => handleClick(step.link)}
            >
              <i className={step.icon}></i>
            </div>
            {/* Title */}
            <h4 
              className={`text-dark fw-bold ${step.link ? "cursor-pointer" : ""}`} 
              style={{ fontSize: "1rem" }}
              onClick={() => handleClick(step.link)}
            >
              {step.title}
            </h4>
            {/* Description */}
            <p 
              className={`text-muted small ${step.link ? "cursor-pointer" : ""}`} 
              style={{ fontSize: "0.8rem" }}
              onClick={() => handleClick(step.link)}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .cursor-pointer:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
