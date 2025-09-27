import React from "react";

const ConfirmedVehicle = ({ setConfirmVehiclePanel, setLookingForDriverPanel, setVehiclePanel }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h4 className="text-lg font-semibold">Confirm your ride</h4>
        <h5
        onClick={() => setConfirmVehiclePanel(false)}
          className="bg-gray-200 w-[36px] h-[36px] flex items-center justify-center rounded-full"
        >
            <i className="ri-close-large-fill text-xl"></i>
        </h5>
      </div>
      <div className="flex justify-center pb-5 border-b-1 border-b-gray-200">
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350380/assets/2f/29d010-64eb-47ac-b6bb-97503a838259/original/UberX-(1).png"
          alt="Fuck"
          className="w-[100px] h-[100px] object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-4 pt-3 w-full">
          <h4 className="w-[5%]">
            <i className="ri-map-pin-fill text-xl"></i>
          </h4>
          <div className="border-b-1 pb-3 border-b-gray-200 w-[95%]">
            <h2 className="text-lg font-semibold">562/111 - A</h2>
            <p>Shadhupara Dilalpur 6600</p>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-3 w-full">
          <h4 className="w-[5%]">
            <i className="ri-square-fill text-xl"></i>
          </h4>
          <div className="border-b-1 pb-3 border-b-gray-200 w-[95%]">
            <h2 className="text-lg font-semibold">Pabna Zilla School</h2>
            <p>Zillapara Dilalpur 6600</p>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-3 w-full">
          <h4 className="w-[5%]">
            <i className="ri-cash-line text-xl"></i>
          </h4>
          <div className="border-b-1 pb-3 border-b-gray-200 w-[95%]">
            <h2 className="text-lg font-semibold">BDT 193.65</h2>
            <p>Cash Cash</p>
          </div>
        </div>
      </div>
      <button
          className="mt-5 bg-black py-2 w-full text-white rounded-lg"
          onClick={() => {
            setLookingForDriverPanel(true)
            setConfirmVehiclePanel(false)
            setVehiclePanel(false)
          }}
        >Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmedVehicle;
