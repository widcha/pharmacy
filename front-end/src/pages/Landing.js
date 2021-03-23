import React from "react";
import ExtendedNavbar from "../components/ExtendedNavbar";

const Landing = () => {
  return (
    <div className="flex flex-col">
      <ExtendedNavbar />
      <div className="font-bold text-blue-500 justify-items-center justify-center text-2xl text-center">
        Landing
      </div>
    </div>
  );
};

export default Landing;
