import * as React from 'react';

interface SquareProps {
     value: string;
     onClick: any;
}

export function Square(props: SquareProps) {
     return (
          <button className="square" onClick={props.onClick}>
               {props.value}
          </button>
     );
}

