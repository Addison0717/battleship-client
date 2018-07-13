import React from 'react'
import './Board.css'

const renderCel = (rowIndex, cellIndex, symbol) => {
  return (
    <button
      className="board-tile"
      disabled={true}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '🌊'}</button>
  ) 
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(rowIndex, cellIndex,symbol))}
  </div>
)
