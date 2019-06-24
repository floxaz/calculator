import React from 'react';

const Tools = props => {
    return (
        <div className="tools">
           <button className="btn btn--tool" id="ac" onClick={props.handleAllClear}>
               {props.digitExistence ? 'C' : 'AC'}
           </button>
           <button className="btn btn--tool" onClick={props.handleNegativePositive}>&plusmn;</button>
           <button className="btn btn--tool" onClick={props.handleFindPersentage}>%</button>
        </div>
    )
}

export default Tools;