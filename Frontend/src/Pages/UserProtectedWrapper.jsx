import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assignUserData } from "../slices/userSlice";
import axios from "axios";

const UserProtectedWrapper = ({ children, childrenRoute }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response)
        const { user } = response.data
        user.token = response.data.token
        dispatch(assignUserData({ user }))
        setIsLoading(false)
        return navigate(`${childrenRoute}`)
      }
    })
    .catch((error) => {
      console.log(`error in user get profile ${error}`)
      localStorage.removeItem('token')
      return navigate('/login')
    })
  }, [token, navigate, dispatch, childrenRoute]);


  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl font-bold">Loading...</h3>
      </div>
    )
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
