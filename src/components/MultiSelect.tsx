import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  icon?: React.ReactNode;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  icon,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeOption = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <div className="tw-relative" ref={containerRef}>
      <div
        className="tw-w-full tw-border tw-rounded-md tw-p-2 tw-flex tw-items-center tw-cursor-pointer tw-bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="tw-flex-1 tw-flex tw-flex-wrap tw-gap-1">
          {icon && <span className="tw-mr-2">{icon}</span>}
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="tw-bg-gray-100 tw-px-2 tw-py-1 tw-rounded-md tw-text-sm tw-flex tw-items-center tw-gap-1"
              >
                {option.label}
                <X
                  className="tw-h-3 tw-w-3 tw-cursor-pointer tw-hover:text-gray-700"
                  onClick={(e) => removeOption(e, option.value)}
                />
              </span>
            ))
          ) : (
            <span className="tw-text-gray-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown className="tw-h-4 tw-w-4 tw-text-gray-400" />
      </div>

      {isOpen && (
        <div className="tw-absolute tw-z-50 tw-w-full tw-mt-1 tw-bg-white tw-border tw-rounded-md tw-shadow-lg tw-max-h-60 tw-overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="tw-px-3 tw-py-2 tw-hover:bg-gray-50 tw-cursor-pointer tw-flex tw-items-center"
              onClick={() => toggleOption(option.value)}
            >
              <div className="tw-w-4 tw-h-4 tw-border tw-rounded tw-mr-2 tw-flex tw-items-center tw-justify-center">
                {value.includes(option.value) && (
                  <Check className="tw-h-3 tw-w-3 tw-text-teal-500" />
                )}
              </div>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
