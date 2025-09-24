import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeLoginStatus, removeCaptainData } from "../slices/captainSlice";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        localStorage.removeItem("token");
        dispatch(changeLoginStatus());
        dispatch(removeCaptainData());
        return navigate("/captain/signin");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div>
      <h1>Captain Logout</h1>
    </div>
  );
};

export default CaptainLogout;
