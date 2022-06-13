import React from "react";

const WordsDisplay = ({ words, getCharClass }) => {
  return (
    <div>
      {words.map((word, i) => (
        <span span key={i}>
          <span className="text-sm">
            {word.split("").map((char, indx) => (
              <span className={getCharClass(i, indx, char)} key={indx}>
                {char}
              </span>
            ))}
          </span>
          <span> </span>
        </span>
      ))}
    </div>
  );
};

export default WordsDisplay;
