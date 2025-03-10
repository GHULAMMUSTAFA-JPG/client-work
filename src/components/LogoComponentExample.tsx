import React from "react";
import LogoComponent from "./LogoComponent";

const LogoComponentExample: React.FC = () => {
  return (
    <div className="logo-examples">
      <h3>Brand Logo</h3>
      <div>
        <LogoComponent role="brand" />
      </div>

      <h3>Creator Logo</h3>
      <div>
        <LogoComponent role="creator" />
      </div>

      <h3>Default Logo (Brand)</h3>
      <div>
        <LogoComponent />
      </div>
    </div>
  );
};

export default LogoComponentExample;
