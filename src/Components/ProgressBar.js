function ProgressBar({ numOfQuestions, index, points, totalPoints, answer }) {
  return (
    <div className="progressBar">
      <progress
        max={numOfQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <div>
        <span>
          Questions <strong>{index + 1}</strong>/{numOfQuestions}
        </span>
        <span>
          Points <strong>{points}</strong>/{totalPoints}
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
