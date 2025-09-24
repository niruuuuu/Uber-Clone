import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div
        className="h-screen w-full flex flex-col justify-between pt-8
          bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover
        ">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-Logo" />
        <div className="bg-white py-5 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full text-white bg-black py-3 rounded mt-5 cursor-pointer"
          >Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
