import React, { useState, useEffect, useRef } from "react";

const constructArray = (HEIGHT, WIDTH, fill) => {
    const ary = [];
    for (let i = 0 ; i < HEIGHT; i++) {
        ary.push([]);
        for (let j = 0 ; j < WIDTH; j++) {
            ary[i].push(fill);
        }
    }
    return ary;
}

const useScore = (initValue) => {
    const [score, setScore] = useState(initValue);
    const upScore = (value) => {
        setScore(score + value);
    }
    return [score, upScore, setScore];
}

const initialUnder = (HEIGHT, WIDTH, MINE_PERCENT) => {
    // const mined = Array.from(Array(HEIGHT), () => Array(WIDTH).fill(false));
    // const nearMineNum = Array.from(Array(HEIGHT), () => Array(WIDTH).fill(0));
    const mined = [];
    const nearMineNum = [];
    for (let i = 0 ; i < HEIGHT; i++) {
        mined.push([]);
        nearMineNum.push([]);
        for (let j = 0 ; j < WIDTH; j++) {
            mined[i].push(false);
            nearMineNum[i].push(0);
        }
    }

    let mineCount = 0;
    for (let i = 0 ; i < HEIGHT; i++) {
        for (let j = 0 ; j < WIDTH ; j++) {
            mined[i][j] = Math.random() < MINE_PERCENT;
            if (mined[i][j]) {
                mineCount++;
                // 상
                if (i > 0)
                    nearMineNum[i-1][j]++;
                // 하
                if (i < HEIGHT - 1)
                    nearMineNum[i+1][j]++;
                // 좌
                if (j > 0)
                    nearMineNum[i][j-1]++;
                // 우
                if (j < WIDTH - 1)
                    nearMineNum[i][j+1]++;
                // 북서
                if (i > 0 && j > 0)
                    nearMineNum[i-1][j-1]++;
                // 북동
                if (i > 0 && j < WIDTH - 1)
                    nearMineNum[i-1][j+1]++;
                // 남서
                if (i < HEIGHT - 1 && j > 0)
                    nearMineNum[i+1][j-1]++;
                // 남동
                if (i < HEIGHT - 1 && j < WIDTH - 1)
                    nearMineNum[i+1][j+1]++;
            }
        }
    }

    for (let i = 0 ; i < HEIGHT; i++) {
        for (let j = 0 ; j < WIDTH; j++) {
            if (mined[i][j])
                nearMineNum[i][j] = "💣";
        }
    }

    return [nearMineNum, mineCount];
}

const useMark = (HEIGHT, WIDTH, MINE_PERCENT) => {
    const [ under, setUnder ] = useState(constructArray(HEIGHT, WIDTH, 0));
    const [ mark, setMarking ] = useState(constructArray(HEIGHT, WIDTH, "notting"));
    const [ score, upScore, setScore ] = useScore(0);
    const [ mineCount, setMineCount ] = useState(0);
    const clickState = useRef('click');

    useEffect(() => {
        const [ newUnder, newMineCount ] = initialUnder(HEIGHT, WIDTH, MINE_PERCENT);
        setMineCount(newMineCount);
        setUnder(newUnder);
        setMarking(constructArray(HEIGHT, WIDTH, "notting"));
        setScore(0);
    }, [HEIGHT, WIDTH, MINE_PERCENT, setScore ])


    const setMark = (low, col, event) => {      
        const ary = [];
        for (let i = 0 ; i < mark.length; i++) {
            ary.push(i);
        }
        const copy = ary.map((idx) => mark[idx].slice(0));
        

        if (event === "clicked" && clickState.current === "click") {
            let count = 0;
            switch(mark[low][col]) {
                case "notting":
                    const recursiveCall = (low, col) => {
                        if (under[low][col] === 0 && copy[low][col] === "notting") {
                            copy[low][col] = "clicked";
                            count++;
                            if (low > 0) {
                                if (col > 0) {
                                    recursiveCall(low-1,col-1,copy);
                                }
                                if (col < WIDTH - 1) {
                                    recursiveCall(low-1,col+1,copy);
                                }
                                recursiveCall(low-1, col,copy);
                                
                            }
                            if (low < HEIGHT - 1) {
                                if (col > 0) {
                                    recursiveCall(low+1,col-1,copy);
                                
                                }
                                if (col < WIDTH - 1) {
                                    recursiveCall(low+1,col+1,copy);
                                }
                                recursiveCall(low+1, col,copy);   
                            }
                            if (col > 0) {
                                recursiveCall(low,col-1,copy);
                            }
                            if (col < WIDTH - 1) {
                                recursiveCall(low,col+1,copy);
                            }
                        }
                        else if (under[low][col] !== 0 && copy[low][col] !== "clicked") {
                            copy[low][col] = "clicked";
                            count++;
                        }
                    }
                    recursiveCall(low,col);
                    if (under[low][col] === "💣")
                        setTimeout(() => {
                            alert("실패입니다. 게임을 재시작합니다.");
                            window.location.reload();
                        }, 10);
                    else {
                        upScore(count);
                    }
                    break;
                case "clicked":
                    // do notting
                    break;
                case "contextMenued":
                    // do notting
                    break;
                default:
                    break;
            }
        }
        else if (event === "contextMenued" || (event === "clicked" && clickState.current === "contextMenu")) {
            switch(mark[low][col]) {
                case "notting":
                    copy[low][col] = "contextMenued";
                    break;
                case "clicked":
                    // do notting
                    break;
                case "contextMenued":
                    copy[low][col] = "notting";
                    break;
                default:
                    break;
            }         
        }
        setMarking(copy);
        return;
    };

    const showContent = (low, col) => {
        let content;
        try {
            switch(mark[low][col]) {
                case "notting":
                    content=<div className={'NotClick'}></div>;
                    break;
                case "clicked":
                    content=under[low][col];
                    if (content === 0)
                        content = <div className={'Zero'}></div>;
                    break;
                case "contextMenued":
                    content="🚩";
                    break;
                default:
                    break;
            }
        }
        catch {
            content = "notting";
        }
        return content;
    }
    return [ score, mineCount, clickState, setMark, showContent ];
}

export { useScore, useMark };