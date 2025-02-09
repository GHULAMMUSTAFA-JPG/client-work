import React from "react";

interface WelcomeBannerProps {
  title: string;
  subtitle: string;
  cta: { text: string; link: string };
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  title,
  subtitle,
  cta,
}) => (
  <div
    className="card border-0 rounded-lg p-4 h-100"
    style={{ borderColor: "#16a085" }}
  >
    <div className="row align-items-center">
      <div className="col-auto">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#16a085",
            color: "white",
            fontSize: "2rem",
          }}
        >
          <i className="bi bi-hand-thumbs-up"></i>
        </div>
      </div>

      {/* Text Section */}
      <div className="col">
        <h1 className="card-title h5 text-dark fw-bold">{title}</h1>
        <p className="card-text text-muted small">{subtitle}</p>
        <a
          href={cta.link}
          className="btn text-white"
          style={{
            backgroundColor: "#16a085",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {cta.text}
        </a>
      </div>
    </div>
  </div>
);

export default WelcomeBanner;
