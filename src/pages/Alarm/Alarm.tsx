import React from "react";
import Header from "../../components/layout/MainHeader";
import NavBar from "../../components/layout/NavBar";
import ServiceReady from "../../components/page/ServiceReady";

const Alarm = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 flex-col justify-center items-center p-4 mt-[-20px]">
        <ServiceReady />
      </div>

      <NavBar />
    </div>
  );
};

export default Alarm;
