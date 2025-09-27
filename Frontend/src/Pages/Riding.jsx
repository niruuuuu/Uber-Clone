import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="absolute top-5 px-5 w-full">
        <div className="flex items-center justify-between">
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber-Logo"
          />
          <Link to={"/home"} className="bg-[#eeeeee6b] h-10 w-10 flex items-center justify-center rounded-full">
            <i className="ri-home-line text-2xl"></i>
          </Link>
        </div>
      </div>
      <div className="h-1/2 w-screen">
        {/* image for temporary usage */}
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        />
      </div>
      <div className="py-5 px-5 w-full flex justify-between items-center border-b-1 border-b-gray-200">
        <div>
          <img
            src="https://scontent.fdac90-1.fna.fbcdn.net/v/t39.30808-6/534982421_1562010098118067_2133469592852599453_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHPKa_e1uErAxsmgGOUzExsbI_pmUlJjfxsj-mZSUmN_LwqCgcdFuY9HZIcCoLE7U3ogETL6POsR9Ou2Qpen8pX&_nc_ohc=WB6N36t55gMQ7kNvwFqX7kC&_nc_oc=AdnCpC2GBFiLUQ2foxR81KGhdnzzFCdOTH1js8OiLenU8KFtZ8PSqZR4UvMhaUL4Z60&_nc_zt=23&_nc_ht=scontent.fdac90-1.fna&_nc_gid=4swOPsT0SbzKOBP_i-aTXA&oh=00_AfbqVeQcazNnc5TNZFM1G3_ze85zcy8nsdVVUajIN3tT1w&oe=68DBB3E8"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div className="text-end">
          <p className="text-[16px] font-semibold">Aronno Amit</p>
          <h4 className="text-[20px] font-semibold">7465414-00</h4>
          <p className="text-[16px] text-gray-500">White Honda Civic</p>
        </div>
      </div>
      <div className="px-5">
        <div className="flex items-center gap-4 pt-3 w-full">
          <h4 className="w-[5%]">
            <i className="ri-square-fill text-xl"></i>
          </h4>
          <div className="border-b-1 pb-3 border-b-gray-200 w-[95%]">
            <h2 className="text-base font-semibold">Pabna Zilla School</h2>
            <p className="text-[14px]">Zillapara Dilalpur 6600</p>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-3 w-full">
          <h4 className="w-[5%]">
            <i className="ri-cash-line text-xl"></i>
          </h4>
          <div className="border-b-1 pb-3 border-b-gray-200 w-[95%]">
            <h2 className="text-base font-semibold">BDT 193.65</h2>
            <p className="text-[14px]">Cash Cash</p>
          </div>
        </div>
      </div>
      <div className="h-1/2 mt-4 w-full px-5">
        <button className="w-full bg-black py-3 text-white rounded-2xl">Make a payment</button>
      </div>
    </div>
  );
};

export default Riding;
