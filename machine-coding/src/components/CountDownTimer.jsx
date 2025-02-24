import React, { useEffect, useState } from "react";

export default function CountDownTimer() {
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");



  const inputChange = (e) => {
    const { id, value } = e.target;
    let inputVal = value === "" ? "" : parseInt(value, 10);

    if (isNaN(inputVal) || inputVal < 0) return;

    let h = parseInt(hours || 0, 10);
    let m = parseInt(minutes || 0, 10);
    let s = parseInt(seconds || 0, 10);

    if (id === "hours") h = inputVal;
    else if (id === "minutes") m = inputVal;
    else if (id === "seconds") s = inputVal;

    const { h: newH, m: newM, s: newS } = normalizeTime(h, m, s);
    console.log("normalizeTime(h, m, s)",normalizeTime(h, m, s))
    setHours(newH === 0 ? "" : newH);
    setMinutes(newM === 0 ? "" : newM);
    setSeconds(newS === 0 ? "" : newS);
  };

  const normalizeTime=(h,m,s)=>{

    if (s >= 60) {
        m += Math.floor(s / 60);
        s = s % 60;
      }
  
      // Convert minutes to hours if > 59
      if (m >= 60) {
        h += Math.floor(m / 60);
        m = m % 60;
      }

    return {h,m,s}
  }

  const handleStart = () => {
    if (!hours && !minutes && !seconds) {
      alert("Enter a valid time!");
      return;
    }
    setIsStart(true);
  };

  const resetTimer = () => {
    clearInterval(timerId);
    setIsStart(false);
    setIsPause(false);
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  const handlePause = () => {
    setIsPause(true);
    clearInterval(timerId);
  };

  const handleResume = () => {
    setIsPause(false);
  };

  useEffect(() => {
    if (isStart && !isPause) {
      const timeId = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1;

          if (minutes > 0) {
            setMinutes((prevMin) => prevMin - 1);
            return 59;
          }

          if (hours > 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
            return 59;
          }

          clearInterval(timeId);
          setIsStart(false);
          alert("Timer Finished");
          return 0;
        });
      }, 1000);

      setTimerId(timeId);
      return () => clearInterval(timeId);
    }
  }, [isStart, isPause, minutes, hours]);

  return (
    <div className="h-screen flex items-center justify-center">
      {!isStart ? (
        <InputTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          inputChange={inputChange}
          handleStart={handleStart}
        />
      ) : (
        <ShowTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isPause={isPause}
          handlePause={handlePause}
          handleResume={handleResume}
          resetTimer={resetTimer}
        />
      )}
    </div>
  );
}

const InputTimer = ({ hours, minutes, seconds, inputChange, handleStart }) => {
  return (
    <>
      <div className="flex space-x-9 text-6xl">
        <input
          placeholder="HH"
          value={hours}
          onChange={inputChange}
          className="border-2 bg-gray-300 max-w-36 rounded-lg font-medium text-center border-gray-300 outline-none"
          id="hours"
        />
        <input
          placeholder="MM"
          value={minutes}
          onChange={inputChange}
          className="border-2 bg-gray-300 max-w-36 rounded-lg font-medium text-center border-gray-300 outline-none"
          id="minutes"
        />
        <input
          placeholder="SS"
          value={seconds}
          onChange={inputChange}
          className="border-2 max-w-36 rounded-lg font-medium bg-gray-300 text-center border-gray-300 outline-none"
          id="seconds"
        />
      </div>
      <button
        className="bg-purple-600 px-6 py-2 cursor-pointer hover:bg-purple-700 text-white rounded-md"
        onClick={handleStart}
      >
        Start
      </button>
    </>
  );
};

const ShowTimer = ({ hours, minutes, seconds, isPause, handlePause, handleResume, resetTimer }) => {
  return (
    <>
      <div className="flex space-x-9 text-6xl font-medium">
        <p className="bg-gray-300 rounded-lg px-6 py-2">
          {hours < 10 ? `0${hours}` : hours}
        </p>
        <p className="bg-gray-300 rounded-lg px-6 py-2">
          {minutes < 10 ? `0${minutes}` : minutes}
        </p>
        <p className="bg-gray-300 rounded-lg px-6 py-2">
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      </div>
      <div>
        {isPause ? (
          <button
            className="bg-purple-600 px-6 py-2 cursor-pointer hover:bg-purple-700 mr-6 text-white rounded-md"
            onClick={handleResume}
          >
            Resume
          </button>
        ) : (
          <button
            className="bg-purple-600 px-6 py-2 cursor-pointer hover:bg-purple-700 mr-6 text-white rounded-md"
            onClick={handlePause}
          >
            Pause
          </button>
        )}
        <button
          className="bg-purple-600 px-6 py-2 cursor-pointer hover:bg-purple-700 text-white rounded-md"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </>
  );
};
