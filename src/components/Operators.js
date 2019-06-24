import React from 'react';

const Operators = props => {
    return (
        <div className="operators" onClick={e => {
            if(props.toNegativeNumber) {
                props.closeParentheses();
            }
            
            if(!props.solvable) {
                if(props.binaryOperatorTriggered == false) {
                    if(e.target.value !== '=') {
                        props.handleBinaryOperator(e.target.value);
                    } else {
                        props.solveExpression();
                    }
                } else {
                    props.replaceBinaryOperator(e.target.value);
                }
            } else {
                props.solveExpression();
            }
        }}>
            <button className="btn btn--operator" value="/">&divide;</button>
            <button className="btn btn--operator" value="*">&times;</button>
            <button className="btn btn--operator" value="-">-</button>
            <button className="btn btn--operator" value="+">+</button>
            <button className="btn btn--operator" value="=">=</button>
        </div>
    )
}

export default Operators;