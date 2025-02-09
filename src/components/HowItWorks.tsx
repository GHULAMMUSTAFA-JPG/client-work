import React from "react";

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface HowItWorksProps {
  steps: Step[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({ steps }) => (
  <div className="card border-1 rounded-lg  p-4">
    <h2 className="text-dark fw-bold mb-4 text-center">How It Works</h2>
    <div className="row gy-4">
      {steps.map((step, index) => (
        <div key={index} className="col-md-4 text-center">
          {/* Icon */}
          <div
            className="d-flex justify-content-center align-items-center mx-auto mb-3"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#16a085",
              color: "white",
              fontSize: "2rem",
            }}
          >
            <i className={step.icon}></i>
          </div>
          {/* Title */}
          <h4 className="text-dark fw-bold">{step.title}</h4>
          {/* Description */}
          <p className="text-muted small">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default HowItWorks;
