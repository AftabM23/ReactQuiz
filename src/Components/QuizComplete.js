function QuizComplete({ dispatch, points, totalPoints, highestScore }) {
  const percentage = Number(points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "💋";
  if (percentage >= 80 && percentage < 100) emoji = "👍";
  if (percentage > 0 && percentage < 80) emoji = "😆";
  if (percentage === 0) emoji = "😿";

  return (
    <div>
      <span className="scoreBoard">
        <h1> Quiz completed</h1>
        <h2>
          {emoji} You scored :<strong>{points}</strong>/{totalPoints}
        </h2>
        <p>You scored: {Math.ceil(percentage)}%</p>
      </span>
      <p>Highest Score: {highestScore}</p>
      <button
        className="startBtn"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default QuizComplete;
