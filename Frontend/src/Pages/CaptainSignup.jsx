import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assignCaptainData, changeLoginStatus } from "../slices/captainSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const [color, setColor] = useState('')
  const [capacity, setCapacity] = useState('')
  const [plate, setPlate] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptainData({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      vehicleType: vehicleType,
      color: color,
      capacity: Number.parseInt(capacity),
      plate: plate
    });

    console.log(captainData)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)

    if (response.status === 201) {
      console.log(response)
      const { captain } = response.data
      captain.token = response.data.token
      dispatch(assignCaptainData({ captain }))
      dispatch(changeLoginStatus())
      localStorage.setItem("token", response.data.token)
      navigate("/captain/home")
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleType('')
    setCapacity('')
    setColor('')
    setVehicleType('')
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-12 mb-3"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber-Logo"
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-lg font-medium mb-1">What's your Name?</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Firstname"
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base outline-none"
              value={firstname}
              onChange={(e) => setFirstname(e.currentTarget.value)}
            />
            <input
              type="text"
              placeholder="Lastname"
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base outline-none"
              value={lastname}
              onChange={(e) => setLastname(e.currentTarget.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-1">What's your email?</h3>
          <input
            type="email"
            placeholder="email@example.com"
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-2 outline-none"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <h3 className="text-lg font-medium mb-1">Enter password</h3>
          <input
            type="password"
            placeholder="password"
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-2
            outline-none"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <h3 className="text-lg font-medium mb-1">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={plate}
              onChange={(e) => {
                setPlate(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={capacity}
              onChange={(e) => {
                setCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="Car">Car</option>
              <option value="Bike">Auto</option>
              <option value="Moto">Moto</option>
            </select>
          </div>
          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mt-2">
            Signup
          </button>
          <p className="text-center mt-2">
            Already have a Captain Account?{" "}
            <Link to="/captain/signin" className="text-[#01bc70d9]">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[12px] text-[#181818e6]">
          This site is protected by{" "}
          <span className="underline">re-Captcha</span> and the{" "}
          <span className="underline">Google Privacy Policy</span> &{" "}
          <span className="underline">Terms of Service Apply</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
