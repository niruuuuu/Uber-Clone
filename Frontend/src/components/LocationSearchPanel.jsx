import React from "react";

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel }) => {
  // Sample locations for testing
  const locations = [
    "Shadhupara, Ataikula RD, Hemayetpur, Pabna 6600, Rajshahi",
    "Robiul Shopping Mall, Dilalpur, Pabna 6600",
    "Lotif Tower, Abdul Hamid RD, Dilalpur, Pabna 6600",
    "Pabna Zilla School, Zillapara, Pabna 6600",
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* just a sample data for ui testing */}
      {locations.map((location, idx) => {
        return <div key={idx} onClick={() => {
          setVehiclePanel(true)
          setPanelOpen(false)
        }} className="flex items-center gap-3 border-2 border-gray-100 active:border-black p-2 rounded-xl">
          <h5 className="">
            <i className="ri-map-pin-line text-xl"></i>
          </h5>
          <h4 className="font-medium">
            {location}
          </h4>
        </div>;
      })}
    </div>
  );
};

export default LocationSearchPanel;
