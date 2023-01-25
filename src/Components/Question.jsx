import React from "react";

export default function Question(props) {
  return props.flagQuestion ? (
    <p className="question flag-question">
      Which country does this flag belong to
    </p>
  ) : (
    <p className="question">{props.capitalCity} is the capital of</p>
  );
}
