import React from "react";

const StartInstructions = ({
  completed,
  setCountdown,
  countdown,
  countTimer,
}) => {
  return (
    <>
      <p className="text-sm mb-4">
        <b className="text-lg underline">How to play: </b> <br />
        Choose a time duration and start typing the words as soon as the timer
        start, the faster you are the higher your accuracy points.
      </p>
      <div>
        <p className="font-bold text-lg">Select Timer in Seconds:</p>
        <button
          className="border py-1 px-3 bg-stone-500 my-4 mx-2 rounded"
          onClick={() => setCountdown(60)}
          disabled={countdown === 60}
        >
          60 Seconds
        </button>
        <button
          className="border py-1 px-3 bg-stone-500 my-4 mx-2 rounded"
          onClick={() => setCountdown(120)}
          disabled={countdown === 120}
        >
          120 Seconds
        </button>
        <button
          className="border py-1 px-3 bg-stone-500 my-4 mx-2 rounded"
          onClick={() => setCountdown(180)}
          disabled={countdown === 180}
        >
          180 Seconds
        </button>
      </div>
      <p className="text-lg mb-4">
        {completed ? "Click to restart the game" : "Click to Start the game"}
      </p>
      <button
        className="mx-auto rounded border w-32 text-sm p-2"
        onClick={countTimer}
        disabled={countdown === 0}
      >
        {completed ? "Restart" : "Start"}
      </button>
    </>
  );
};

export default StartInstructions;
