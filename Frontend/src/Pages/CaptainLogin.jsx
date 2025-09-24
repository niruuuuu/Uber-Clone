import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assignCaptainData, changeLoginStatus } from "../slices/captainSlice";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captainData, setCaptainData] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCaptainData({
      email: email,
      password: password
    })

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData)

    if (response.status === 200) {
      console.log(response)
      const { captain } = response.data
      captain.token = response.data.token
      localStorage.setItem('token', response.data.token)
      dispatch(assignCaptainData({ captain }))
      dispatch(changeLoginStatus())
      navigate('/captain/home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber-Logo"
        />
        <form onSubmit={(e) => {
          handleSubmit(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            type="email"
            placeholder="email@example.com"
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7 outline-none"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            placeholder="password"
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7
            outline-none"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center mt-2">Join a fleet? <Link to="/captain/signup" className="text-[#01bc70d9]">Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#1ba16a] flex items-center justify-center text-white font-semibold rounded px-4 py-2 border w-full text-lg   placeholder:text-base">
            Sign in as user
          </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;