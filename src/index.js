import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [null, null, null].map(() => [null, null, null]),
            xIsNext: true,
        }
    }

    handleClick(i, j) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i][j]) {
            return;
        }
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i, j) {
        return (
            <Square
                value={this.state.squares[i][j]}
                onClick={() => this.handleClick(i, j)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        console.log('winner ',winner);
        let status;
        if (winner) {
            status = 'Выиграл ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                </div>
            </div>
        );
    }
}

// console.log(calculateWinner([['X','X','X'],[null,null,null],[null,null,null]]))

function calculateWinner(matrix) {
    console.log(matrix);
    let length = matrix.length
    console.log(length);
    let xRowWin,
        oRowWin,
        xColumnWin,
        oColumnWin;
    let xDiagonalWin = 0;
    let oDiagonalWin = 0;
    let xAuxiliaryDiagonalWin = 0;
    let oAuxiliaryDiagonalWin = 0;
    for (let i = 0; i < length; i++) {
        xRowWin = xColumnWin = oRowWin = oColumnWin = 0;
        for (let j = 0; j < length; j++) {
            if (matrix[i][j] === 'X') xRowWin++;
            if (matrix[i][j] === 'O') oRowWin++;
            if (matrix[j][i] === 'X') xColumnWin++;
            if (matrix[j][i] === 'O') oColumnWin++;
            if (i === j && matrix[i][j] === 'X') xDiagonalWin++;
            if (i === j && matrix[i][j] === 'O') oDiagonalWin++;
            if (j === length - i - 1 && matrix[i][j] === 'X') xAuxiliaryDiagonalWin++;
            if (j === length - i - 1 && matrix[i][j] === 'O') oAuxiliaryDiagonalWin++;
        }

        if (
            xRowWin === 3 ||
            xColumnWin === 3 ||
            xDiagonalWin === 3 ||
            xAuxiliaryDiagonalWin === 3
        ) {
            console.log('X win');
            return 'X';
        }

        if (
            oRowWin === 3 ||
            oColumnWin === 3 ||
            oDiagonalWin === 3 ||
            oAuxiliaryDiagonalWin === 3
        ) {
            console.log('O win');
            return 'O';
        }
    }
    return null;
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);
