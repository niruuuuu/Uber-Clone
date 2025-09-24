import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUserData, changeLoginStatus } from "../slices/userSlice";

const UserLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response)
        localStorage.removeItem("token");
        dispatch(removeUserData())
        dispatch(changeLoginStatus())
        return navigate("/login");
      }
    })
    .catch((error) => {
      console.log(`Error in axios logout request: ${error}`);
    });

  return (
    <>
      <h1>User Logout</h1>
    </>
  );
};

export default UserLogout;
