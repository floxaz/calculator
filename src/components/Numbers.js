import React from 'react';

const Numbers = props => {
    const checkPointPresence = () => {
        const digitString = props.digit.toString();
        return digitString.includes('.');
    };
    //console.log(props);
    return (
        <div className="numbers" onClick={e => {
            if(e.target.tagName.toLowerCase() === 'button') {
                if(props.solved && !props.binaryOperatorTriggered) {
                    props.clearExpression();
                }

                if(props.binaryOperatorTriggered || props.solved) {
                    props.handleAllClear();
                    props.binaryOperatorUntrigger();
                    props.newExpression();
                }

                if(e.target.textContent !== '.') {
                    props.handleNumber(e);
                } else {
                    if(!checkPointPresence()) {
                        props.handleNumber(e);
                    }
                }

                props.readyToSolve();
            }
        }}>
            <button className="btn btn--number">7</button>
            <button className="btn btn--number">8</button>
            <button className="btn btn--number">9</button>
            <button className="btn btn--number">4</button>
            <button className="btn btn--number">5</button>
            <button className="btn btn--number">6</button>
            <button className="btn btn--number">1</button>
            <button className="btn btn--number">2</button>
            <button className="btn btn--number">3</button>
            <button className="btn btn--number" id="zero">0</button>
            <button className="btn btn--number">.</button>
        </div>
    )
}

export default Numbers;