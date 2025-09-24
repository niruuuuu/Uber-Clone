import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assignUserData, changeLoginStatus } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios"

const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData)

    if (response.status === 201) {
      const { user } = response.data
      user.token = response.data.token
      dispatch(assignUserData({ user }))
      localStorage.setItem("token", response.data.token)
      dispatch(changeLoginStatus())
      navigate('/home')
    } else {
      console.log(`Something went wrong`)
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-Logo"
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Name?</h3>
          <div className="flex gap-2 mb-3">
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
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            type="email"
            placeholder="email@example.com"
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            placeholder="password"
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-3
            outline-none"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mt-2">
            Signup
          </button>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-[#01bc70d9]">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[12px] text-[#181818e6]">
          By proceeding, you consent to get calls, Whatsapp or SMS messages, included by automatic means from Uber, and its affiliates to the number provided
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
