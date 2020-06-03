import React, { useState } from "react";

function Toggle (props) {
  const [ toggle, setToggle ] = useState('click');
  props.clickState.current = toggle;

  const onClick = () => {
    if (toggle === 'click')
        setToggle('contextMenu');
    else
        setToggle('click');
  }
  return (
  <>
    <div>
        <button onClick={onClick} className={'Toggle'}><span role="img" className={'flag'} aria-label="flag" >{toggle === 'click'?'😄':'🚩'}</span></button>
    </div>
  </>
  );
}

export default Toggle;