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
    case 'RESET':
      return action.payload
    default:
      throw new Error()
  }
}

export const useHistory = initPresent => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, present: initPresent })

  const canUndo = state.past.length > 0
  const canRedo = state.future.length > 0

  const setPresent = newPresent => {
    dispatch({ type: 'SET', newPresent })
  }

  const undo = () => {
    if (canUndo) {
      dispatch({ type: 'UNDO' })
    }
  }

  const redo = () => {
    if (canRedo) {
      dispatch({ type: 'REDO' })
    }
  }

  const reset = () => {
    dispatch({ type: 'RESET', payload: { ...initialState, present: initPresent } })
  }

  return { present: state.present, setPresent, undo, canUndo, redo, canRedo, reset }
}
