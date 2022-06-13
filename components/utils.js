export function handleKeydown({ keyCode, key }) {
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

export function getCharClass(wordidx, charIdx, char) {
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
