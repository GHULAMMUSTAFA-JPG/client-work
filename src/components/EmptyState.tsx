"use client";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  secondaryDescription?: string;
  buttonText?: string;
  buttonLink?: string;
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
  color = "#16a085",
  iconSize = 48,
}) => {
  const router = useRouter();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
      <div className="mb-3">
        <i className={icon} style={{ fontSize: iconSize, color }}></i>
      </div>
      <h3 className="text-dark fw-bold">{title}</h3>
      <p className="text-muted small">{description}</p>
      {secondaryDescription && (
        <p className="text-muted small">{secondaryDescription}</p>
      )}
      {buttonText && buttonLink && (
        <button
          className="btn btn-primary mt-3"
          style={{ backgroundColor: color, borderColor: color }}
          onClick={() => router.push(buttonLink)}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
