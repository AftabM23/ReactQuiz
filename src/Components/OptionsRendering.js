function OptionsRendering({ questions, dispatch, answer, points }) {
  const hasAnswer = answer !== null;

  return (
    <div className="optionsContainer">
      {questions.options.map((option, index) => (
        <button
          className={`options ${
            hasAnswer
              ? index === questions.correctOption
                ? "correctAnswer"
                : "wrongAnswer"
              : ""
          }`}
          key={option}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default OptionsRendering;
