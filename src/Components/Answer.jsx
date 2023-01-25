import React from "react";

export default function (props) {
  return (
    <li>
      <button
        className="answer"
        onClick={() => {
          props.setIsClicked(props.id);
          props.setAnswerClicked(props.country);
        }}
        style={
          props.isClicked === props.id
            ? {
                backgroundColor: "#f9a826",
                color: "white",
                borderColor: "#f9a826",
              }
            : {}
        }
      >
        {props.country}
      </button>
    </li>
  );
}
