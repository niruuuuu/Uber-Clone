import React from "react";

const WaitForDriver = ({ setWaitForDriverPanel }) => {
  return (
    <div>
      <div className="flex justify-between items-center w-full py-3 border-b-1 border-b-gray-200">
        <h4 className="text-lg font-semibold">Meet at the pickup point</h4>
        <div className="flex flex-col items-center justify-center bg-black text-white px-3 py-1">
          <h3 className="font-semibold">5</h3>
          <span>Min</span>
        </div>
      </div>
      <div className="py-5 w-full flex justify-between items-center border-b-1 border-b-gray-200">
        <div>
          <img
            src="https://scontent.fdac90-1.fna.fbcdn.net/v/t39.30808-6/534982421_1562010098118067_2133469592852599453_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHPKa_e1uErAxsmgGOUzExsbI_pmUlJjfxsj-mZSUmN_LwqCgcdFuY9HZIcCoLE7U3ogETL6POsR9Ou2Qpen8pX&_nc_ohc=WB6N36t55gMQ7kNvwFqX7kC&_nc_oc=AdnCpC2GBFiLUQ2foxR81KGhdnzzFCdOTH1js8OiLenU8KFtZ8PSqZR4UvMhaUL4Z60&_nc_zt=23&_nc_ht=scontent.fdac90-1.fna&_nc_gid=4swOPsT0SbzKOBP_i-aTXA&oh=00_AfbqVeQcazNnc5TNZFM1G3_ze85zcy8nsdVVUajIN3tT1w&oe=68DBB3E8"
            className="w-25 h-25 rounded-full object-cover"
          />
        </div>
        <div className="text-end">
          <p className="text-[16px] text-gray-500">Aronno Amit</p>
          <h4 className="text-[20px] font-semibold">7465414-00</h4>
          <p className="text-[16px] text-gray-500">White Honda Civic</p>
          <div>
            <i className="ri-star-s-fill text-xl mr-1 fill-gray-400"></i>
            <span>4.9</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 py-3 w-full">
        <h4 className="w-[5%]">
          <i className="ri-map-pin-fill text-xl"></i>
        </h4>
        <div className="border-b-1 pb-3 border-b-gray-200 w-[95%]">
          <h2 className="text-lg font-semibold">562/111 - A</h2>
          <p>Shadhupara Dilalpur 6600</p>
        </div>
      </div>
    </div>
  );
};

export default WaitForDriver;
