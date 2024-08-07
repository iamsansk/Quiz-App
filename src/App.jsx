import { useState,useRef } from 'react';
import './App.css';
import jsonData from './questions.json';

function App() {
  const [showWin, setShowWin] = useState(false);
  const [score, setScore] = useState(0);
  const [qNo, setQNo] = useState(0);
  const [next, setNext] = useState(false);
  const [clicked,setClicked] = useState(false);

  const refs = useRef([]);
  function checkAnswer(selectedOpt,index) {
    if (jsonData[qNo].correctOption === selectedOpt) {
      setScore((prevScore) => prevScore + 1);
      refs.current[index].style.backgroundColor = "green";
    }else{
      refs.current[index].style.backgroundColor = "orangered";
      refs.current.forEach(ele=>{
        if(ele.textContent == jsonData[qNo].correctOption){
          ele.style.backgroundColor = "green";
        }
      });
    } 
    setNext(true);
    setClicked(true);
  }
  function resetData(){
    refs.current.forEach(ele=>{
      ele.style.backgroundColor = "#60a3bc";
    })
  }
  function nextQuestion() {
    if (jsonData.length > qNo+1) {
      setQNo((prevQuestion) => prevQuestion + 1);
    } else {
      setShowWin(true);
    }
    setNext(false);
    setClicked(false);
    resetData();
  }

  function restartQuiz() {
    setShowWin(false);
    setScore(0);
    setQNo(0);
    setNext(false);
  }

  return (
    <>
      {!showWin ? (
        <div className='quiz-container'>
          <h2>Quiz App</h2>
          <div className='number-container'>
            <p>Q.No: {qNo + 1}</p>
            <p>Score: {score}</p>
          </div>
          <div className='question-container'>
            <h4 key={qNo}>
              {qNo + 1}. {jsonData[qNo]['question']}
            </h4>
          </div>
          <div className='options'>
            {jsonData[qNo].options.map((opt, index) => (
              <button key={index} onClick={() => checkAnswer(opt,index)}  ref={el => refs.current[index] = el} disabled={clicked}>
                {opt}
              </button>
            ))}
          </div>
          <div className='next-btn'>
            {next && (
              <button className='next' onClick={nextQuestion}>
                NEXT
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='result'>
          <p>SCORE</p>
          <h1>{score}</h1>
          <p>OUT OF {jsonData.length}</p>
          <button onClick={restartQuiz}>RESTART</button>
        </div>
      )}
    </>
  );
}

export default App;
