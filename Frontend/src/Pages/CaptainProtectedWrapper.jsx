import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assignCaptainData } from "../slices/captainSlice";
import { useDispatch } from "react-redux";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return navigate("/captain/signin", { replace: true });
    }
  }, [token, navigate]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        const { captain } = response.data;
        captain.token = response.data.token
        dispatch(assignCaptainData({ captain }));
        setIsLoading(false);
      }
    })
    .catch((error) => {
      localStorage.removeItem("token")
      console.log("Some error", error)
      navigate("/captain/signin")
    });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h3 className="text-2xl font-bold">Loading...</h3>
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
