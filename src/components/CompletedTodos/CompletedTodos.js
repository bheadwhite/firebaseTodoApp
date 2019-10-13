import React, { useContext } from 'react'
import { FirebaseContext } from 'context/firebase'
import { completedStyles } from 'styles'

export default function CompletedTodos() {
	const todos = useContext(FirebaseContext)
	const classes = completedStyles()
	const completedTodos = todos.filter(todo => todo.complete)
	return (
		<>
			{completedTodos.length > 0 && (
				<div className={classes.title}>completed todos:</div>
			)}
			{completedTodos &&
				completedTodos.map(todo => <div className={classes.completed} key={todo.id}>{todo.task}</div>)
			}
		</>
	)
}
