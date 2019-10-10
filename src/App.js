import React, { useReducer, useState, useContext} from "react"
import "./App.css"
import { FirebaseContext } from "./context/firebase"
// @material ui
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
	complete: {
		textDecoration: "line-through"
	},
	delete: {
		textDecoration: "solid",
		background: "red",
		marginLeft: "auto"
	},
	item: {}
})

function App(props) {
	const classes = useStyles()
  const [todo, setTodo] = useState("")
  const firebase = useContext(FirebaseContext)
	const [todos, setTodos] = useReducer(todoReducer, [{ task: "test", complete: false }, { task: "testing", complete: false }])
	const handleComplete = todo => setTodos({ type: actions.COMPLETE, payload: todo })
	const handleDelete = id => setTodos({ type: actions.DELETE, payload: id })
	const handleSubmitTodo = e => {
		e.preventDefault()
		if (!(todo.length > 0)) return
		setTodos({ type: actions.ADD_TODO, payload: todo })
		setTodo("")
	}

	return (
		<div className='App'>
			<form>
				<Input value={todo} onChange={e => setTodo(e.target.value)}></Input>
				<Button type='submit' onClick={handleSubmitTodo}>
					Add
				</Button>
			</form>
			<List>
				{todos.map((todo, i) => (
					<ListItem key={`${todo}_${i}`} className={classes.item} onClick={() => handleComplete(todo.task)}>
						<Typography className={todo.complete ? classes.complete : ""}>{todo.task}</Typography>
						{todo.complete && (
							<Button className={classes.delete} onClick={() => handleDelete(i)}>
								DELETE
							</Button>
						)}
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default App

const todoReducer = (state, action) => {
	switch (action.type) {
		case actions.ADD_TODO:
			return [
				...state,
				{
					task: action.payload,
					complete: false
				}
			]
		case actions.COMPLETE:
			return state.map(todo => {
				if (todo.task === action.payload && !todo.complete) {
					todo.complete = true
				} else if (todo.task === action.payload && todo.complete) {
					todo.complete = false
				}
				return todo
			})
		case actions.DELETE:
			state.splice(action.payload, 1)
			return [...state]
		default:
			return state
	}
}

const actions = {
	ADD_TODO: "ADD_TODO",
	COMPLETE: "COMPLETE",
	DELETE: "DELETE"
}
