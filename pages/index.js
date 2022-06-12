import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import randomWords from "random-words";

const MainComponent = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #3a5369;
  color: white;
  /* overflow: hidden; */
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  font-family: "MonteCarlo", cursive;
  letter-spacing: 0.1em;
  text-align: center;
  margin-bottom: 1rem;
`;

export default function Home() {
  const NUMB_OF_WORDS = 200;
  const SECONDS = 20;

  const [words, setWords] = useState([]);
  const [start, setStart] = useState(false);
  const [countdown, setCountdown] = useState(SECONDS);
  const [currentValue, setCurrentValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [completed, setCompleted] = useState(false);

  const generateWords = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  };

  const countTimer = () => {
    setStart(true);
    setCompleted(false);
    setCountdown(SECONDS);
    setWords(generateWords());
    setCorrect(0);
    setWrong(0);
    setCurrentIndex(0);

    let interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setStart(false);
          setCompleted(true);
          setCurrentValue("");
          return SECONDS;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  console.log(completed);

  function handleKeydown({ keyCode }) {
    if (keyCode === 32) {
      checkMatch();
      setCurrentValue("");
      setCurrentIndex(currentIndex + 1);
    }
  }

  const checkMatch = () => {
    const wordsToCheck = words[currentIndex];
    const isMatch = wordsToCheck === currentValue.trim();
    if (isMatch) {
      setCorrect(correct + 1);
    } else {
      setWrong(wrong + 1);
    }
  };

  useEffect(() => {
    setWords(generateWords());
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Typing Speed game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainComponent className="bg-[#3a5369] w-full">
        <section className="w-full max-h-screen">
          <Title className="">Typing Test Game</Title>

          {/* timer */}
          <div className="w-40 flex justify-center mx-auto items-center">
            <div className="w-20 h-20 flex align-middle justify-center bg-[#243441] mx-auto mb-4 text-5xl">
              <h1 className="m-auto font-black">{countdown}</h1>
            </div>
            <p className="text-lg px-2 font-bold">Seconds</p>
          </div>
          <div className="w-3/5 rounded-lg p-6 center bg-[#243441] shadow-md mx-auto">
            {!start && (
              <div className="mx-auto w-2/4 text-center">
                {completed && (
                  <>
                    <h2 className="text-center text-3xl font-black underline mb-6">
                      Scores
                    </h2>
                    <div className="flex justify-between mx-auto text-sm mb-8">
                      <div className="px-6 py-4 border w-56">
                        <p className="font-bold text-lg">Words per minute</p>
                        <p className="italic text-base">{correct}</p>
                      </div>
                      <div className="px-6 py-4 border w-56">
                        <p className="font-bold text-lg">Accuracy</p>
                        <p className="italic text-base">
                          {Math.round((correct / (correct + wrong)) * 100) || 0}{" "}
                          %
                        </p>
                      </div>
                    </div>
                  </>
                )}
                <p className="text-sm mb-4">
                  <b className="text-lg underline">How to play: </b> <br />
                  Start typing the words as soon as the timer start, the faster
                  you are the higher your accuracy points.
                </p>

                <p className="text-lg mb-4">
                  {completed
                    ? "Click to restart the game"
                    : "Click to Start the typing game"}
                </p>
                <button
                  className="mx-auto rounded border w-32 text-sm p-2"
                  onClick={countTimer}
                >
                  {completed ? "Restart" : "Start"}
                </button>
              </div>
            )}

            {start && (
              <div>
                {words.map((word, i) => (
                  <span span key={i}>
                    <span className="text-sm">
                      {word.split("").map((char, indx) => (
                        <span key={indx}>{char}</span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {start && (
            <div className="w-3/4 mx-auto text-sm">
              <input
                type="text"
                disabled={!start}
                className="w-full p-2 mt-6 text-black outline-none rounded h-12"
                placeholder="Type in here"
                onKeyDown={handleKeydown}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              />
            </div>
          )}
        </section>
      </MainComponent>
    </div>
  );
}
