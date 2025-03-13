import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, campaign }) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Campaign Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✖
        </button>
      </div>
      <div className="p-4">
        <p><strong>Campaign:</strong> {campaign?.Headline || "No Campaign Selected"}</p>
      </div>
    </div>
  );
};

export default Sidebar;
