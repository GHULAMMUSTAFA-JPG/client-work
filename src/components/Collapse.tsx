import React, { ReactNode } from "react";

interface Props {
  id: string | number;
  title: string;
  content: ReactNode;
}

const Collapse = ({ id, title, content }: Props) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${id}`}
          aria-expanded="false"
          aria-controls={`collapse-${id}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`collapse-${id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading-${id}`}
        data-bs-parent="#genericAccordion"
      >
        <div className="accordion-body">{content}</div>
      </div>
    </div>
  );
};

export default Collapse;
