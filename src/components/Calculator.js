import React from 'react';
import Header from './Header';
import Screen from './Screen';
import Tools from './Tools';
import Numbers from './Numbers';
import Operators from './Operators';

export default class Calculator extends React.Component {
    state = {
        digit: '0',
        digitExistence: false,
        binaryOperatorTriggered: false,
        binaryOperatorPresence: false,
        toNegativeNumber: false,
        expression: '0',
        solvable: false,
        solved: false
    }

    handleNumber = e => {
        e.persist();
        const target = e.target.textContent;
        this.setState(prevState => {
            if(prevState.digit == '0' && prevState.expression == '0') {
                if(target !== '0') {
                    if(target != '.') {
                        return {
                            digit: target,
                            digitExistence: true,
                            expression: target
                        }
                    } else {
                        if(!this.checkPointPresence()) {
                            return {
                                digit: '0' + target,
                                digitExistence: true,
                                expression: '0' + target
                            }
                        }
                    }
                }
            } else {
                // you get here if expression is not zero, cuz digit always annules when you click on binary operator
                const digitedNumbers = prevState.digit.toString();
                const zeroTakenOut = digitedNumbers.slice(1);
                if(prevState.digit === '0') {
                    if(target !== '0') {
                        if(target != '.') {
                            return {
                                digit: target,
                                digitExistence: true,
                                expression: prevState.expression + target
                            }
                        } else {
                            if(prevState.expression[prevState.expression.length - 1] == '0') {
                                return {
                                    digit: '0' + target,
                                    digitExistence: true,
                                    expression: prevState.expression + target
                                }
                            } else {
                                return {
                                    digit: '0' + target,
                                    digitExistence: true,
                                    expression: prevState.expression + '0' + target
                                }
                            }
                        }
                    } else {
                        if(prevState.expression[prevState.expression.length - 1] != '0') {
                            return {
                                // handleClearAll has already assigned 0 by default
                                digitExistence: true,
                                expression: prevState.expression + target
                            }
                        }
                        
                    }
                } else {
                    if(target !== '0') {
                        if(target != '.') {
                            return {
                                digit: prevState.digit + target,
                                digitExistence: true,
                                expression: prevState.expression + target
                            }
                        } else {
                            return {
                                digit: prevState.digit + target,
                                digitExistence: true,
                                expression: prevState.expression + target
                            }
                        }
                    } else {
                        return {
                            digit: prevState.digit + target,
                            digitExistence: true,
                            expression: prevState.expression + target
                        }
                    }
                }
            }
        });
    }

    checkPointPresence = () => {
        const digitString = this.state.digit.toString();
        return digitString.includes('.');
    }

    handleAllClear = () => {
        console.log('tf');
        if(!this.state.binaryOperatorPresence) {
            this.setState({
                digit: '0',
                digitExistence: false,
                solvable: false
            });
        } else {
            this.setState(prevState => {
                let givenExpression = prevState.expression;
                givenExpression = this.expressionWithoutLastDigit(givenExpression);

                return {
                    digit: '0',
                    digitExistence: false,
                    solvable: false,
                    expression: givenExpression,
                    binaryOperatorTriggered: true
                }
            });
        }
    }

    clearExpression = () => {
        this.setState({
            expression: '0'
        });
    }

    expressionWithoutLastDigit = givenExpression => {
        let foundOperator = '';
        let count = givenExpression.length - 1;
        do {
            if(givenExpression[count] == '.') {
                count--;
            }
            foundOperator = givenExpression[count];
            count--;
        } while(!isNaN(foundOperator));

        count+=2;
        givenExpression = givenExpression.slice(0, count);

        return givenExpression;
    }

    handleNegativePositive = () => {
        if(!this.state.binaryOperatorTriggered) {
            if(this.state.digit !== '0') {
                const digitedNumbers = this.state.digit.toString();
                if(!digitedNumbers.includes('-')) {
                   this.setState(prevState => {
                       let changeExpression = prevState.expression.toString();
                       if(prevState.binaryOperatorPresence) {
                           changeExpression = this.expressionWithoutLastDigit(changeExpression);
                       } else {
                           const foundDigit = changeExpression.indexOf(prevState.digit);
                           changeExpression = changeExpression.slice(0, foundDigit);
                       }
                       console.log(prevState.digit);
                       return {
                           digit: '-' + prevState.digit,
                           expression: changeExpression + '(-' + prevState.digit,
                           toNegativeNumber: true
                       }
                   })
                } else {
                    this.setState(prevState => {
                        let changeExpression = prevState.expression.toString();
                        const digitedNumbers = prevState.digit.toString();
                        let foundDigit = changeExpression.indexOf('-');
                        if(changeExpression.includes('(')) {
                            foundDigit = changeExpression.indexOf('(');
                        } else {
                            foundDigit = changeExpression.indexOf('-');
                        }
                        changeExpression = changeExpression.slice(0, foundDigit);
                        return {
                            digit: digitedNumbers.slice(1),
                            expression: changeExpression + digitedNumbers.slice(1),
                            minusPresence: false
                        }
                    });
                }
            }
        }
    }

    closeParentheses = () => {
        this.setState(prevState => {
            const expression = prevState.expression.toString();
            if(expression.includes('(')) {
                return {
                    expression: prevState.expression + ')',
                    toNegativeNumber: false
                }
            }
        });
    }

    handleFindPersentage = () => {
        this.setState(prevState => {
            if(!prevState.binaryOperatorTriggered) {
                if(prevState.binaryOperatorPresence) {
                    let changeExpression = prevState.expression.toString();
                    changeExpression = this.expressionWithoutLastDigit(changeExpression);
    
                    return {
                        digit: prevState.digit / 100,
                        expression: changeExpression + (prevState.digit / 100)
                    }
                } else {
                    return {
                        digit: prevState.digit / 100,
                        expression: prevState.digit / 100
                    }
                }
            }
        })
    }

    handleBinaryOperator = operator => {
        this.setState(prevState => ({
            expression: prevState.expression + operator,
            binaryOperatorTriggered: true,
            binaryOperatorPresence: true
        }));
    }

    replaceBinaryOperator = operator => {
        if(operator !== '=') {
            this.setState(prevState => ({
                expression: prevState.expression.slice(0, prevState.expression.length - 1) + operator
            }));
        }
    }

    readyToSolve = () => {
        if(this.state.binaryOperatorPresence && isNaN(this.state.expression[this.state.expression.length - 1])) {
            this.setState({
                solvable: true
            });
        }
    }

    solveExpression = () => {
        if(this.state.binaryOperatorPresence) {
            this.setState(prevState => ({
                digit: eval(prevState.expression),
                expression: eval(prevState.expression),
                solved: true,
                binaryOperatorPresence: false,
                solvable: false
            }))
    
            this.binaryOperatorUntrigger();
        }
    }

    newExpression = () => {
        this.setState(prevState => ({
            solved: false
        }))
    }

    binaryOperatorUntrigger = () => {
        this.setState({
            binaryOperatorTriggered: false
        })
    }

    render() {
        return (
            <div className="global-container">
                <Header />
                <div className="container">
                    <Screen digit={this.state.digit} />
                    <Tools 
                        handleAllClear={this.handleAllClear} 
                        digitExistence={this.state.digitExistence}
                        handleNegativePositive={this.handleNegativePositive}
                        handleFindPersentage={this.handleFindPersentage}
                    />
                    <Numbers 
                        handleNumber={this.handleNumber}
                        digit={this.state.digit}
                        binaryOperatorTriggered={this.state.binaryOperatorTriggered}
                        handleAllClear={this.handleAllClear}
                        solved={this.state.solved}
                        newExpression={this.newExpression}
                        binaryOperatorUntrigger={this.binaryOperatorUntrigger}
                        readyToSolve={this.readyToSolve}
                        clearExpression={this.clearExpression}
                    />
                    <Operators 
                        binaryOperatorTriggered={this.state.binaryOperatorTriggered}
                        handleBinaryOperator={this.handleBinaryOperator}
                        replaceBinaryOperator={this.replaceBinaryOperator}
                        toNegativeNumber={this.state.toNegativeNumber}
                        closeParentheses={this.closeParentheses}
                        solvable={this.state.solvable}
                        solveExpression={this.solveExpression}
                    />
                </div>
            </div>
        )
    };
}