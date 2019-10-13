import { makeStyles } from "@material-ui/core";

const listStyles = makeStyles({
  complete: {
    textDecoration: "line-through"
  },
  delete: {
    textDecoration: "solid",
    background: "red",
    marginLeft: "auto"
  },
  item: {}
});

const completedStyles = makeStyles({
  completed: {
    color: 'white',
    fontSize: '1.3rem',
    textAlign: 'left',
    listStyle: ''
  },
  title: {
    color: 'red',
    textDecoration: 'underline'
  }
})

export { listStyles, completedStyles };
