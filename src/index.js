import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import { useHistory } from './useHistory'

const initValue = Array(625).fill(false)

function App() {
  const { present, setPresent, undo, canUndo, redo, canRedo, reset } = useHistory(initValue)
  return (
    <div className="container">
      <div>
        <button className="btn" onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button className="btn" onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="grid">
        {(() => {
          const blocks = []
          let i = 0
          while (i++ < 625) {
            const index = i // for closure in onClick callback function
            blocks.push(
              <div
                className={`block${present[i] ? ' active' : ''}`}
                key={i}
                onClick={() => {
                  const newPresent = [...present]
                  newPresent[index] = !newPresent[index]
                  setPresent(newPresent)
                }}
              />
            )
          }
          return blocks
        })()}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
