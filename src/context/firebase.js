import React, { createContext, useState } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

var config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

firebase.initializeApp(config)
const FirebaseContext = createContext()
const firebaseTodos = firebase.firestore().collection('todos')

const FirebaseProvider = props => {
	const [todos, setTodos] = useState([])
	//similar to DidUpdate Lifecycle, onSnapshot updates context todos from DB
	firebaseTodos.onSnapshot(docs => {
		let DBtodos = []
		docs.forEach(doc => {
			let myTodo = doc.data()
			myTodo.id = doc.id
			DBtodos = [...DBtodos, myTodo]
		})
		if (DBtodos.length !== todos.length) {
			setTodos(DBtodos)
		}
	})
	return (
		<FirebaseContext.Provider value={todos}>
			{props.children}
		</FirebaseContext.Provider>
	)
}

export { FirebaseContext, FirebaseProvider, firebaseTodos }
