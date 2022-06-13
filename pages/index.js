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
  const NUMB_OF_WORDS = 150;
  const SECONDS = 0;

  const [words, setWords] = useState([]);
  const [start, setStart] = useState(false);
  const [countdown, setCountdown] = useState(SECONDS);
  const [currentValue, setCurrentValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const generateWords = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  };

  const countTimer = () => {
    setStart(true);
    setCompleted(false);
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

  function handleKeydown({ keyCode, key }) {
    if (keyCode === 32) {
      checkMatch();
      setCurrentValue("");
      setCurrentIndex(currentIndex + 1);
      setCurrCharIndex(-1);
    } else {
      setCurrChar(key);
      setCurrCharIndex(currCharIndex + 1);
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

  function getCharClass(wordidx, charIdx, char) {
    if (
      wordidx === currentIndex &&
      charIdx === currCharIndex &&
      currChar &&
      !completed
    ) {
      if (char === currChar) {
        return "bg-green-600";
      } else {
        return "bg-red-600";
      }
    } else {
      return "";
    }
  }

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
          <div className="w-52 flex justify-center mx-auto items-center">
            <div className=" w-32 h-16 flex align-middle justify-center bg-[#243441] mx-auto mb-4 text-5xl">
              <h1 className="m-auto font-black">{countdown}</h1>
            </div>
            <p className="text-lg px-2 font-bold ">Seconds</p>
          </div>
          <div className="w-3/5 rounded-lg p-6 center bg-[#243441] shadow-md mx-auto">
            {!start && (
              <div className="mx-auto w-3/4 text-center">
                {completed && (
                  <>
                    <h2 className="text-center text-3xl font-black underline mb-6">
                      Scores
                    </h2>
                    <div className="flex justify-between mx-auto text-sm mb-8 ">
                      <div className="px-6 py-4 border w-56 rounded-md">
                        <p className="font-bold text-lg">Points</p>
                        <p className="italic text-base">
                          {correct + " / " + NUMB_OF_WORDS}
                        </p>
                      </div>
                      <div className="px-6 py-4 border w-56 rounded-md">
                        <p className="font-bold text-lg">Accuracy</p>
                        <p className="italic text-base">
                          {Math.round((correct / NUMB_OF_WORDS) * 100) || 0} %
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <p className="text-sm mb-4">
                  <b className="text-lg underline">How to play: </b> <br />
                  Choose a time duration and start typing the words as soon as
                  the timer start, the faster you are the higher your accuracy
                  points.
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
                  {completed
                    ? "Click to restart the game"
                    : "Click to Start the game"}
                </p>
                <button
                  className="mx-auto rounded border w-32 text-sm p-2"
                  onClick={countTimer}
                  disabled={countdown === 0}
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
                        <span
                          className={getCharClass(i, indx, char)}
                          key={indx}
                        >
                          {char}
                        </span>
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
