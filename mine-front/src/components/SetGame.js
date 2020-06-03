import React from "react";

function SetGame (props) {
    const { setHEIGHT, setWIDTH, setMINE_PERCENT } = props;
    const HEIGHTChange = (e) => {
        setHEIGHT(e.target.value);
    }
    const WIDTHChange = (e) => {
        setWIDTH(e.target.value);
    }
    const MINE_PERCENTChange = (e) => {
        setMINE_PERCENT(e.target.value);
    }
    return (
    <div className={'SetGame'}>
        <label>세로<input type="number" placeholder="10" onChange={HEIGHTChange} max="15"></input></label>
        <label>가로<input type="number" placeholder="10" onChange={WIDTHChange} max="15"></input></label>
        <label>지뢰 발생률<input type="number" placeholder="0.1" onChange={MINE_PERCENTChange} max="1"></input></label>
    </div>);    
}

export default SetGame;