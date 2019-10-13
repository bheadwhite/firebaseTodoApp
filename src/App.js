import React from 'react'
import './App.css'
import AddTodo from 'components/AddTodo/AddTodo'
import CompletedTodo from 'components/CompletedTodos/CompletedTodos'
import ListTodos from 'components/ListTodos/ListTodos'

function App(props) {
	return (
		<div className='App'>
			<AddTodo />
			<ListTodos />
			<CompletedTodo />
		</div>
	)
}

export default App
