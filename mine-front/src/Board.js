import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import Modal from "react-modal";

// 랜덤한 지뢰 생성
// <table>
// <tr> * 10
// <td> * 10
//TODO: 폭탄 눌렀을 때, 전체 비활성화
//TODO: 옆에 폭탄 갯수 세기
function Td (props) {
    const nearMineNum = props.nearMineNum;
    const mined = props.mined;
    const [ mark, setMark ] = useState("notting");
    
    const clickHandler = (e) => {
        e.preventDefault();
        if (mark === "notting") {
            if (mined) {
                setMark("mine");
                setTimeout(() => {
                    alert("실패입니다. 게임을 재시작합니다.");
                    window.location.reload();
                }, 10);
            } else {
                setMark("number");
                props.upCurrent(+1);
            }
        }
        else if (mark === "flag") {
            setMark("notting");
            if (mined)
                props.upCurrent(-1);  
        }
        else if (mark === "mine") {
            // nothing
        }
        else if (mark === "number") {
            // noting
        }
    }

    const contextmenuHandler = (e) => {
        e.preventDefault();
        if (mark === "notting") {
            setMark("flag");
            if (mined)
                props.upCurrent(+1);
        }
        else if (mark === "flag") {
            setMark("notting");
        }
        else if (mark === "mine") {
            //nothing
        }
        else if (mark === "number") {
            //nothing
        }
    }

    const showContent = (marking) => {
        let content;
        if(marking === "notting")
            content = "";
        else if (marking === "number")
            content = nearMineNum;
        else if (marking === "flag")
            content = "🚩";
        else if (marking === "mine")
            content = "💣";
        return content;
    }
    
    return (<td onClick={clickHandler} onContextMenu={contextmenuHandler}>{showContent(mark)}</td>);
}

function Tr (props) {
    const tdIdx = [];
    for (let i = 1;i < props.width + 1; i++) {
        tdIdx[i] = i;
    }
    const tds = tdIdx.map((idx) => 
        (<Td key={idx.toString()} 
            nearMineNum={props.nearMineNum[idx-1]} 
            mined={props.mined[idx-1]} 
            upCurrent={props.upCurrent}/>)
        );
    return (
        <>
            <tr> 
                {tds} 
            </tr>
        </>
    );
}


const useCurrent = (init) => {
    const [ opened, setOpened ] = useState(init);
    const uploadCurrent = (value) => {
        setOpened(opened + value);
    };

    return [ opened, uploadCurrent ];
}


// 폭탄 갯수를 카운팅해주어야 함.
// td의 state를 여기까지 끌어올린다.
function Table (props) {
    const nearMineNum = props.nearMineNum;
    const mined = props.mined;
    const trIdx = [];
    for (let i = 1; i < props.height + 1; i++) {
        trIdx[i] = i;
    }
    const [ current, upCurrent ] = useCurrent(0);
    useEffect(() => {
        if (current === props.height * props.width) {
            props.openModal();
        } 
    }, [current, props]);

    const trs = trIdx.map((idx) => <Tr key={idx.toString()} width={props.width} nearMineNum={nearMineNum[idx-1]} mined={mined[idx-1]} upCurrent={upCurrent}/> );
    return (
        <>
            <table> 
                <tbody>
                    {trs}
                </tbody>
            </table>
        </>
    );    
}


function Time (props){
    return (<h1 className= {'Time'}> Time : {props.time}s </h1>);
}


const initialBoard = (HEIGHT, WIDTH, MINE_PERCENT) => {
    const nearMineNum = [];
    const mined = [];
    let isMine;
    // 0으로 채운 배열 생성
    for (let i = 0 ; i < HEIGHT; i++) {
        const lineNums = Array(WIDTH);
        lineNums.fill(0);
        nearMineNum.push(lineNums);
    }

    // mine 심기
    for (let i = 0 ; i < HEIGHT; i++) {
        const lineMines = [];
        for (let j = 0 ; j < WIDTH ; j++) {
            isMine = Math.random() < MINE_PERCENT;
            if (isMine) {
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
            lineMines.push(isMine);
        }
        mined.push(lineMines);    
    }
    return [nearMineNum, mined];
}

Modal.setAppElement('#root');

function Board () {
    
    const [ time, setTime ] = useState(0);
    const completeTime = useRef();
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const afterOpenModal = () =>{
        completeTime.current = time;
    }
    const closeModal = () => {
        setIsOpen(false);
    };
    
    const MINE_PERCENT = 0.1;
    const HEIGHT = 1;
    const WIDTH = 1;

    const result = useRef(initialBoard(HEIGHT, WIDTH, MINE_PERCENT));
    
    const WriteRecord = (e) => {
        e.preventDefault(e);
        try {
            Axios({
                url: "http://127.0.0.1:8000/record/upload",
                method: "POST",
                data: {
                    nickName: e.target.nickName.value,
                    time: completeTime.current
                }
            })
            .then(res => {
                console.log(res);
                if (res.data === "success")
                    closeModal();
            });
        }
        catch {
            alert("에러 발생");
        }
    }


    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(c => c+1);
        }, 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);

    return (
        <>
            <div className={'Board'}>
                <h1> Mine Collector </h1>
                <Time time={time}/>
                <Table openModal={openModal} mined={result.current[1]} nearMineNum={result.current[0]} width={WIDTH} height={HEIGHT} />
                <Modal className={'Modal'} isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    onAfterOpen={afterOpenModal}>
                    <p>축하합니다. {completeTime.current}초 걸렸습니다.</p>
                    <form onSubmit={WriteRecord}>
                    <label htmlFor="nickName">
                        별칭: 
                        <input type="text" name="nickName"></input>
                    </label>
                    <input type="submit"></input> 
                    </form>
                </Modal>
            </div>
            <Record/>    
        </>
    );
}


function Record (props) {
    const list = useRef("");
    useEffect(() =>{
        Axios({
            url: "http://127.0.0.1:8000/record/list",
            method: "get"
        })
        .then(res => {
            if (res.data.length === 0)
                list.current = "🚩존재하지 않습니다.";
            else 
                list.current = res.data.map(json => <li key={json.nickName}>{json.nickName + " " + json.time + "초"}</li>); 
        });
    }, []);
    
    return (
        <>
            <div className={'Record'}>
                <h1> Record </h1>
                <ol style={{paddingLeft:"0px"}}>
                    {list.current}
                </ol>
            </div>
        </>
    );
}

export default Board;