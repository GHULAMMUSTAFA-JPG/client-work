"use client";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  secondaryDescription?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonAction?: () => void;
  color?: string;
  iconSize?: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "bi bi-file-earmark-text",
  title,
  description,
  secondaryDescription,
  buttonText,
  buttonLink,
  buttonAction,
  color = "#16a085",
  iconSize = 48,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (buttonAction) {
      buttonAction();
    } else if (buttonLink) {
      router.push(buttonLink);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
      <div className="mb-3 text-xs">
        <i className={icon} style={{ fontSize: iconSize, color }}></i>
      </div>
      <h3 className="text-dark text-xs" style={{ fontSize: "1.1rem" }}>
        {title}
      </h3>
      <p className="text-muted small">{description}</p>
      {secondaryDescription && (
        <p className="text-muted small">{secondaryDescription}</p>
      )}
      {buttonText && (buttonLink || buttonAction) && (
        <button
          className="btn btn-primary mt-3"
          style={{ backgroundColor: color, borderColor: color }}
          onClick={handleClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
