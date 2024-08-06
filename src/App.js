import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Components/Header";
import MainFrame from "./Components/MainFrame";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";
import ProgressBar from "./Components/ProgressBar";
import QuizComplete from "./Components/QuizComplete";
const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highestScore: 0,
  timer: null,
};
const SECS_PER_QUESTIONS = 2;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        timer: state.questions.length * SECS_PER_QUESTIONS,
      };
    case "ready":
      return { ...state, status: "ready" };
    case "finishQuiz":
      return {
        ...state,
        status: "finish",
        index: 0,
        answer: null,
        highestScore:
          state.points > state.highestScore ? state.points : state.highestScore,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQue":
      return { ...state, index: state.index + 1, answer: null };
    case "restart":
      return {
        ...state,

        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        timer: 10,
      };
    case "timer":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer === 0 ? "finish" : "active",
      };
    default:
      throw new Error("State error");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highestScore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      })

      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce(
    (prevVal, cur) => (prevVal = prevVal + cur.points),
    0
  );
  return (
    <div className="App">
      <Header />
      {status === "active" ? (
        <ProgressBar
          numOfQuestions={numOfQuestions}
          index={index}
          points={points}
          totalPoints={totalPoints}
          answer={answer}
        />
      ) : (
        <></>
      )}
      <MainFrame>
        {status === "Loading" && <p style={{ color: "white" }}>Loading..</p>}
        {status === "error" && <p style={{ color: "red" }}>Error..</p>}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            dispatch={dispatch}
            questions={questions[index]}
            answer={answer}
            points={points}
            numOfQuestions={numOfQuestions}
            index={index}
            timer={timer}
          />
        )}
        {status === "finish" && (
          <QuizComplete
            dispatch={dispatch}
            points={points}
            highestScore={highestScore}
            totalPoints={totalPoints}
            answer={answer}
          />
        )}
      </MainFrame>
      {/* <MainFrame questions={state} /> */}
    </div>
  );
}

export default App;
