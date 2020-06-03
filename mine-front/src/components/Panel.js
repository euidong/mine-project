import React from "react";


function Panel (props) {
    const { low, col, setMark, showContent } = props;

    const clickHandler = (e) => {
        e.preventDefault();
        setMark(low, col, "clicked");
    }

    const contextmenuHandler = (e) => {
        e.preventDefault();
        setMark(low, col, "contextMenued");
    }

    return  <>
                <td onClick={clickHandler} onContextMenu={contextmenuHandler}>
                    {showContent(low, col)}
                </td>
            </>;
}

export default Panel;