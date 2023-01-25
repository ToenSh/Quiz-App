import { useState, useEffect } from "react";
import quizImg from "./assets/pic1.svg";
import quizImg2 from "./assets/pic2.svg";
import "./App.css";
import Answer from "./Components/Answer";
import Question from "./Components/Question";
import { nanoid } from "nanoid";

export default function App() {
  const [questionData, setQuestionData] = useState({
    capitalCity: "",
    correctCountry: "",
    countries: [],
    flag: "",
  });
  const [flagQuestion, setFlagQuestion] = useState(false);
  const [answerClicked, setAnswerClicked] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);

  //fetch the needed data for the question from API
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const questionInfo = {
          capitalCity: data[randomIndex].capital[0],
          correctCountry: data[randomIndex].name.common,
          flag: data[randomIndex].flags.png,
          countries: shuffleCountries([
            {
              id: nanoid(),
              country: data[randomIndex].name.common,
            },
            ...getCountries(data),
          ]),
        };
        setQuestionData(questionInfo);
      });
  }, [flagQuestion]);

  //function to populate the countries array in the state object
  function getCountries(data) {
    const randomIndexes = [];
    for (let i = 0; i < 3; i++) {
      randomIndexes[i] = Math.floor(Math.random() * 250);
    }
    return randomIndexes.map((index) => {
      return {
        id: nanoid(),
        country: data[index].name.common,
      };
    });
  }

  //algorithm to shuffle the countries so that the correct answer is not always the first answer
  function shuffleCountries(countriesList) {
    let i = countriesList.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [countriesList[randIndex], countriesList[i]] = [
        countriesList[i],
        countriesList[randIndex],
      ];
    }
    return countriesList;
  }

  //making it so there's two types of questions
  function checkAnswer() {
    if (answerClicked === questionData.correctCountry) {
      setFlagQuestion((prevQuestion) => !prevQuestion);
      setCorrectAnswersAmount(
        (prevCorrectAnswersAmount) => prevCorrectAnswersAmount + 1
      );
    } else {
      setQuizEnded(true);
    }
  }

  function tryAgain() {
    setQuizEnded(false);
    setFlagQuestion((prevFlagQuestion) => !prevFlagQuestion);
  }

  //creating a list of answers to display
  const answersList = questionData?.countries.map((country) => {
    return (
      <Answer
        key={nanoid()}
        id={country.id}
        country={country.country}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        answerClicked={answerClicked}
        setAnswerClicked={setAnswerClicked}
      />
    );
  });

  console.log(correctAnswersAmount);

  return (
    <main>
      {quizEnded ? (
        <div className="results-card">
          <img src={quizImg2} alt="image" className="quiz-img-2" />
          <span className="results-header">Results</span>
          <p>
            You got{" "}
            <span className="correct-answers-amount">
              {correctAnswersAmount}
            </span>{" "}
            correct answers
          </p>
          <button className="try-again" onClick={tryAgain}>
            Try again
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          <h1 className="quiz-header">COUNTRY QUIZ</h1>
          <img src={quizImg} alt="image" className="quiz-img" />
          <div className="quiz-card">
            {flagQuestion && (
              <img
                src={questionData.flag}
                alt="flag"
                className="country-flag"
              />
            )}
            <Question
              capitalCity={questionData.capitalCity}
              flagQuestion={flagQuestion}
            />
            <ul className="answers">{answersList}</ul>
            {isClicked && (
              <button className="next-question" onClick={checkAnswer}>
                Check Answer
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
