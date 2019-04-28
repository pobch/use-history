import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

function App() {
  return (
    <div className="container">
      <div className="grid">
        {(() => {
          const blocks = []
          let i = 1
          while (i++ <= 625) {
            blocks.push(<div className="block" key={i} />)
          }
          return blocks
        })()}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
