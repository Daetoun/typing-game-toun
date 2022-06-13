import React from "react";

const Timer = ({ countdown }) => {
  return (
    <div className="w-52 flex justify-center mx-auto items-center">
      <div className=" w-32 h-16 flex align-middle justify-center bg-[#243441] mx-auto mb-4 text-5xl">
        <h1 className="m-auto font-black">{countdown}</h1>
      </div>
      <p className="text-lg px-2 font-bold ">Seconds</p>
    </div>
  );
};

export default Timer;
