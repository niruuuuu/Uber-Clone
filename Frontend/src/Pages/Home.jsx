import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import { LocationSearchPanel, VehiclePanel, ConfirmedVehicle, LookingForDriver, WaitForDriver } from "../components";

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const arrowIcon = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const vehicleRef = useRef(null)
  const [confirmVehiclePanel, setConfirmVehiclePanel] = useState(false)
  const confirmVehiclePanelRef = useRef(null)
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false)
  const lookingForDriverRef = useRef(null)
  const [waitForDriverPanel, setWaitForDriverPanel] = useState(false)
  const waitForDriverPanelRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: "0 20px"
      })
      gsap.to(arrowIcon.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: "0px"
      })
      gsap.to(arrowIcon.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehicleRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(vehicleRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmVehiclePanel) {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmVehiclePanel])

  useGSAP(function () {
    if (lookingForDriverPanel) {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [lookingForDriverPanel])

  useGSAP(function () {
    if (waitForDriverPanel) {
      gsap.to(waitForDriverPanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(waitForDriverPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [waitForDriverPanel])

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber-Logo"
      />
      <div
        onClick={() => setVehiclePanel(false)}
        className="h-screen w-screen">
        {/* image for temporary usage */}
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        />
      </div>
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[30%] bg-white p-5 relative">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Find a trip</h3>
            <h5 ref={arrowIcon} className="opacity-0" onClick={() => setPanelOpen(false)}>
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
          </div>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line bg-gray-800 h-16 w-1 absolute top-20 left-10 rounded-full"></div>
            <input
              className="bg-[#eee] text-base px-12 py-2 outline-none rounded-lg w-full mb-2 mt-4"
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              onChange={((e) => setPickup(e.currentTarget.value))}
              onClick={() => setPanelOpen(true)}
            />
            <input
              className="bg-[#eee] text-base px-12 py-2 outline-none rounded-lg w-full"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.currentTarget.value)}
              onClick={() => setPanelOpen(true)}
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
        <div ref={vehicleRef} className="fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full">
          <VehiclePanel setConfirmVehiclePanel={setConfirmVehiclePanel} setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} />
        </div>
        <div ref={confirmVehiclePanelRef} className="fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full">
          <ConfirmedVehicle setConfirmVehiclePanel={setConfirmVehiclePanel} setLookingForDriverPanel={setLookingForDriverPanel} setVehiclePanel={setVehiclePanel} />
        </div>
        <div ref={lookingForDriverRef} className="fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full">
          <LookingForDriver setLookingForDriverPanel={setLookingForDriverPanel} />
        </div>
        <div ref={waitForDriverPanelRef} className="fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full">
          <WaitForDriver setWaitForDriverPanel={setWaitForDriverPanel} />
        </div>
      </div>
    </div>
  );
};

export default Home;
