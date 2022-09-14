import React from "react";

import Sidebar from "./Sidebar/Sidebar";
export default function Home() {
  return (
    <div className="row">
      <Sidebar />
      <div className="col">Home</div>
    </div>
  );
}
