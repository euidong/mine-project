import React, { useRef, useState } from 'react';
import Board from './components/Board/Board';
import Timer from "./components/Timer";
import ResultModal from './components/ResultModal';
import SetGame from "./components/SetGame";
import Record from './components/Record';

function App() {
  // get time.
  const time = useRef(null);
  const clearTimer = useRef(null);

  // 초기 setting
  const [ HEIGHT, setHEIGHT ] =useState(10);
  const [ WIDTH, setWIDTH ] = useState(10);
  const [ MINE_PERCENT, setMINE_PERCENT ] = useState(0.1);

  // modal logic.
  const [modalIsOpen, setModalOpen] = useState(false);
  const modalOpen = () => {
    setModalOpen(true);
    clearTimer.current();
  }

  return (
    <div className="App">
      <Timer time={time} clearTimer={clearTimer}/>
      <Board modalOpen={modalOpen} HEIGHT={HEIGHT} WIDTH={WIDTH} MINE_PERCENT={MINE_PERCENT} />
      <SetGame setHEIGHT={setHEIGHT} setWIDTH={setWIDTH} setMINE_PERCENT={setMINE_PERCENT} />
      <ResultModal time={time.current} modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} HEIGHT={HEIGHT} WIDTH={WIDTH} MINE_PERCENT={MINE_PERCENT} />
      <Record WIDTH={WIDTH} HEIGHT={HEIGHT} MINE_PERCENT={MINE_PERCENT}/>
    </div>
  );
}

export default App;
