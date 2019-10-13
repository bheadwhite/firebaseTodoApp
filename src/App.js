import React, { useState, useContext } from 'react'
import './App.css'
import { FirebaseContext, firebaseTodos } from './context/firebase'
// import * as firebase from 'firebase/app'
// @material ui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './AppStyles'

function App(props) {
	const classes = useStyles()
	const [todo, setTodo] = useState('')
	const todos = useContext(FirebaseContext)
	const handleComplete = (id, complete) => {
		firebaseTodos
			.doc(id)
			.update({
				complete: !complete
			})
			.catch(e => console.log('there was an error toggling complete ', e))
	}
	const handleDelete = (e, id) => {
		e.stopPropagation()
		firebaseTodos
			.doc(id)
			.delete()
			.catch(e => console.log('got an error ', e))
	}
	const handleSubmitTodo = e => {
		e.preventDefault()
		if (!(todo.length > 0)) return
		firebaseTodos.add({
			task: todo,
			complete: false
		})
		setTodo('')
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
				{todos.length > 0 &&
					todos.map(({ id, task, complete }) => (
						<ListItem
							key={id}
							className={classes.item}
							onClick={() => handleComplete(id, complete)}>
							<Typography className={complete ? classes.complete : ''}>
								{task}
							</Typography>
							{complete && (
								<Button
									className={classes.delete}
									onClick={e => handleDelete(e, id)}>
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
