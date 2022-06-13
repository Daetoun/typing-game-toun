import React from "react";

const Scoreboard = ({ correct, NUMB_OF_WORDS }) => {
  return (
    <>
      <h2 className="text-center text-3xl font-black underline mb-6">Scores</h2>
      <div className="flex justify-between mx-auto text-sm mb-8 ">
        <div className="px-6 py-4 border w-56 rounded-md">
          <p className="font-bold text-lg">Points</p>
          <p className="italic text-base">{correct + " / " + NUMB_OF_WORDS}</p>
        </div>
        <div className="px-6 py-4 border w-56 rounded-md">
          <p className="font-bold text-lg">Accuracy</p>
          <p className="italic text-base">
            {Math.round((correct / NUMB_OF_WORDS) * 100) || 0} %
          </p>
        </div>
      </div>
    </>
  );
};

export default Scoreboard;
