import React, { useEffect } from "react";
import Table from "../Table";
import { useMark } from "./BoardHook";
import Toggle from "../Toggle";

function Board (props) {
    const { HEIGHT, WIDTH, MINE_PERCENT, modalOpen } = props;
    const [ score, mineCount, clickState, setMark, showContent ] = useMark(HEIGHT, WIDTH, MINE_PERCENT);
    useEffect(() => {
        if ((HEIGHT * WIDTH) - mineCount === score) {
            if (score !== 0)
                modalOpen();
        }
    }, [score, HEIGHT, WIDTH, modalOpen, mineCount]);

    return (
        <>
            <div className={'Board'}>
                <h1><span role="img" aria-label="boom">💣</span> : {mineCount}</h1>
                <Toggle clickState={clickState}/>
                <Table setMark={setMark} showContent={showContent} HEIGHT={HEIGHT} WIDTH={WIDTH}/>
            </div>
        </>
    );
}

export default Board;