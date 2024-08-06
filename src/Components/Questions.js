import { useEffect } from "react";
import OptionsRendering from "./OptionsRendering";

function Questions({
  dispatch,
  questions,
  answer,
  points,
  numOfQuestions,
  index,
  timer,
}) {
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  function secondsToMinutes(timer) {
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  return (
    <div>
      <h1>{questions.question}</h1>
      <OptionsRendering
        questions={questions}
        dispatch={dispatch}
        answer={answer}
        points={points}
      />

      <p>{secondsToMinutes(timer)}</p>
      {answer !== null && index < numOfQuestions - 1 ? (
        <button
          className="startBtn"
          onClick={() => dispatch({ type: "nextQue" })}
        >
          Next question
        </button>
      ) : (
        ""
      )}
      {answer !== null && index === numOfQuestions - 1 && (
        <button
          className="startBtn"
          onClick={() => dispatch({ type: "finishQuiz" })}
        >
          Finish quiz
        </button>
      )}

      <button
        className="startBtn"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default Questions;
