import React from "react";

const VehiclePanel = ({ setPanelOpen, setVehiclePanel, setConfirmVehiclePanel }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold">Choose your ride</h4>
        <h5
          onClick={() => {
            setVehiclePanel(false);
            setPanelOpen(true);
            setConfirmVehiclePanel(false)
          }}
          className="bg-gray-200 w-[36px] h-[36px] flex items-center justify-center rounded-full"
        >
          <i className="ri-close-large-fill text-xl"></i>
        </h5>
      </div>
      <div
        className="flex items-center justify-between w-full px-3 py-3 border-2 border-gray-300 active:border-black rounded-xl mb-2"
        onClick={() => {
          setConfirmVehiclePanel(true)
        }}
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350380/assets/2f/29d010-64eb-47ac-b6bb-97503a838259/original/UberX-(1).png"
          alt="uber car image"
        />
        <div className="w-1/2">
          <div className="flex w-full gap-5">
            <h4 className="font-medium text-15px">UberGo</h4>
            <span className="flex">
              <i className="ri-user-6-fill"></i>
              <p className="font-medium text-15px">4</p>
            </span>
          </div>
          <h5 className="text-[14px]">15 mins away</h5>
          <p className="text-gray-600 text-[13px]">Affordable, Compact rides</p>
        </div>
        <h2 className="text-[18px] font-semibold">BDT 430.65</h2>
      </div>
      <div
        className="flex items-center justify-between w-full px-3 py-3 border-2 border-gray-300 active:border-black rounded-xl mb-2"
        onClick={() => {
          setConfirmVehiclePanel(true)
        }}
      >
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
          alt="uber bike image"
        />
        <div className="w-1/2">
          <div className="flex w-full gap-5">
            <h4 className="font-medium text-15px">Moto</h4>
            <span className="flex">
              <i className="ri-user-6-fill"></i>
              <p className="font-medium text-15px">1</p>
            </span>
          </div>
          <h5 className="text-[14px]">11 mins away</h5>
          <p className="text-gray-600 text-[13px]">
            Affordable, Motorcycle rides
          </p>
        </div>
        <h2 className="text-[18px] font-semibold">BDT 252.61</h2>
      </div>
      <div
        className="flex items-center justify-between w-full px-3 py-3 border-2 border-gray-300 active:border-black rounded-xl mb-2"
        onClick={() => {
          setConfirmVehiclePanel(true)
        }}
      >
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
          alt="uber car image"
        />
        <div className="w-1/2">
          <div className="flex w-full gap-5">
            <h4 className="font-medium text-15px">Uber Auto</h4>
            <span className="flex">
              <i className="ri-user-6-fill"></i>
              <p className="font-medium text-15px">3</p>
            </span>
          </div>
          <h5 className="text-[14px]">13 mins away</h5>
          <p className="text-gray-600 text-[13px]">Affordable, Auto rides</p>
        </div>
        <h2 className="text-[18px] font-semibold">BDT 430.65</h2>
      </div>
      <div className="flex items-center justify-between w-full px-3 py-3 border-2 border-gray-300 active:border-black rounded-xl mb-2">
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350380/assets/2f/29d010-64eb-47ac-b6bb-97503a838259/original/UberX-(1).png"
          alt="uber car image"
        />
        <div className="w-1/2">
          <div className="flex w-full gap-5">
            <h4 className="font-medium text-15px">UberGo</h4>
            <span className="flex">
              <i className="ri-user-6-fill"></i>
              <p className="font-medium text-15px">4</p>
            </span>
          </div>
          <h5 className="text-[14px]">15 mins away</h5>
          <p className="text-gray-600 text-[13px]">Affordable, Compact rides</p>
        </div>
        <h2 className="text-[18px] font-semibold">BDT 430.65</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
