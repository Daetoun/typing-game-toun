import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import randomWords from "random-words";
import Timer from "../components/Timer";
import Scoreboard from "../components/Scoreboard";
import StartInstructions from "../components/StartInstructions";
import WordsDisplay from "../components/WordsDisplay";

const MainComponent = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #3a5369;
  color: white;
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

  //function to generate words
  const generateWords = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  };

  //function to start game
  const countTimer = () => {
    setStart(true);
    setCompleted(false);
    setWords(generateWords());
    setCorrect(0);
    setWrong(0);
    setCurrentIndex(0);
    setCurrChar("");

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

  //function to handle what is typed
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

  //function to check match of words
  const checkMatch = () => {
    const wordsToCheck = words[currentIndex];
    const isMatch = wordsToCheck === currentValue.trim();
    if (isMatch) {
      setCorrect(correct + 1);
    } else {
      setWrong(wrong + 1);
    }
  };

  //generate new words everytime game starts
  useEffect(() => {
    setWords(generateWords());
  }, []);

  //to get classname attribute
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
          <Timer countdown={countdown} />
          <div className="w-3/5 rounded-lg p-6 center bg-[#243441] shadow-md mx-auto">
            {!start && (
              <div className="mx-auto w-3/4 text-center">
                {completed && (
                  <Scoreboard correct={correct} NUMB_OF_WORDS={NUMB_OF_WORDS} />
                )}

                <StartInstructions
                  countdown={countdown}
                  completed={completed}
                  setCountdown={setCountdown}
                  countTimer={countTimer}
                />
              </div>
            )}

            {start && (
              <WordsDisplay words={words} getCharClass={getCharClass} />
            )}
          </div>

          {/* Input field */}
          {start && (
            <div className="w-2/4 mx-auto text-sm">
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
