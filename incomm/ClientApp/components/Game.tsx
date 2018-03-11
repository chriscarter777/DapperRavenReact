﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Board } from './Board';

interface GameBoard {
     squares: string[];
}

interface GameState {
     history: GameBoard[];
     stepNumber: number;
     xIsNext: boolean;
}

export class Game extends React.Component<RouteComponentProps<{}>, GameState> {
     constructor() {
          super();
          this.state = {
               history: [{ squares: ["", "", "", "", "", "", "", "", ""] }],
               //history: [{ squares: Array(9).fill(null) }],
               stepNumber: 0,
               xIsNext: true
          };
     }

     handleClick(i: number) {
          const history = this.state.history.slice(0, this.state.stepNumber + 1);
          const current = history[history.length - 1];
          const squares = current.squares.slice();
          if (this.calculateWinner(squares) || squares[i]) {
               return;
          }
          squares[i] = this.state.xIsNext ? "X" : "O";
          this.setState({
               history: history.concat([
                    {
                         squares: squares
                    }
               ]),
               stepNumber: history.length,
               xIsNext: !this.state.xIsNext
          });
     }

     jumpTo(step: number) {
          this.setState({
               stepNumber: step,
               xIsNext: (step % 2) === 0
          });
     }

     public render() {
          const history = this.state.history;
          const current = history[this.state.stepNumber];
          const winner = this.calculateWinner(current.squares);

          const moves = history.map((step: GameBoard, move: number) => {
               const desc = move ?
                    'Go to move #' + move :
                    'Go to game start';
               return (
                    <li key={move}>
                         <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
               );
          });

          let status;
          if (winner) {
               status = "Winner: " + winner;
          } else {
               status = "Next player: " + (this.state.xIsNext ? "X" : "O");
          }

          return (
               <div className="game">
               <h1>Tic Tac Toe</h1>
                    <div className="game-board">
                         <Board
                              squares={current.squares}
                              onClick={(i: number) => this.handleClick(i)}
                         />
                    </div>
                    <br />
                    <div className="game-info">
                         <div>{status}</div>
                         <br />
                         <ol>{moves}</ol>
                    </div>
               </div>
          );
     }

     private calculateWinner(squares: string[]) {
          const lines = [
               [0, 1, 2],
               [3, 4, 5],
               [6, 7, 8],
               [0, 3, 6],
               [1, 4, 7],
               [2, 5, 8],
               [0, 4, 8],
               [2, 4, 6]
          ];
          for (let i = 0; i < lines.length; i++) {
               const [a, b, c] = lines[i];
               if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
               }
          }
          return null;
     }
}




