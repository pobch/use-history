import { useReducer } from 'react'

const initialState = {
  past: [], // array of present array
  present: [], // array of boolean
  future: [] // array of present array
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'UNDO':
      return {
        past: prevState.past.slice(0, prevState.past.length - 1),
        present: prevState.past[prevState.past.length - 1],
        future: [...prevState.future, prevState.present]
      }
    case 'REDO':
      return {
        past: [...prevState.past, prevState.present],
        present: prevState.future[prevState.future.length - 1],
        future: prevState.future.slice(0, prevState.future.length - 1)
      }
    case 'SET':
      return {
        past: [...prevState.past, prevState.present],
        present: action.newPresent,
        future: []
      }
    default:
      throw new Error()
  }
}

export const useHistory = initPresent => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, present: initPresent })

  const setPresent = newPresent => {
    dispatch({ type: 'SET', newPresent })
  }

  const undo = () => {
    dispatch({ type: 'UNDO' })
  }

  const canUndo = state.past.length > 0

  const redo = () => {
    dispatch({ type: 'REDO' })
  }

  const canRedo = state.future.length > 0

  return { present: state.present, setPresent, undo, canUndo, redo, canRedo }
}
