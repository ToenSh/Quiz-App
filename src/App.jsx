import { useState, useEffect } from "react";
import quizImg from "./assets/pic1.svg";
import quizImg2 from "./assets/pic2.svg";
import "./App.css";

export default function App() {
  return (
    <main>
      <div className="quiz-container">
        <h1 className="quiz-header">COUNTRY QUIZ</h1>
        <img src={quizImg} alt="image" className="quiz-img" />
        <div className="quiz-card">
          <p className="question"> Kuala Lumpur is the capital of</p>
          <ul className="answers">
            <li>
              <button className="answer">
                <span>A</span> Vietnam
              </button>
            </li>
            <li>
              <button className="answer">
                <span>B</span> Malaysia
              </button>
            </li>
            <li>
              <button className="answer">
                <span>C</span> Sweden
              </button>
            </li>
            <li>
              <button className="answer">
                <span>D</span> Austria
              </button>
            </li>
          </ul>
          <button className="next-question">Next</button>
        </div>
      </div>
    </main>
  );
}
