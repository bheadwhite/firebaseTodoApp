import React, { useContext } from 'react'
import { FirebaseContext, firebaseTodos } from 'context/firebase'
// @material ui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { listStyles } from 'AppStyles'

export default function ListTodos() {
	const classes = listStyles()
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
	return (
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
	)
}
