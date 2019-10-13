import React, { useState } from 'react'
import { firebaseTodos } from 'context/firebase'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

export default function AddTodo() {
	const [todo, setTodo] = useState('')
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
		<form>
			<Input value={todo} onChange={e => setTodo(e.target.value)}></Input>
			<Button type='submit' onClick={handleSubmitTodo}>
				Add
			</Button>
		</form>
	)
}
