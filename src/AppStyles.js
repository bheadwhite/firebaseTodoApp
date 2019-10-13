import { makeStyles } from "@material-ui/core";

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
});

export { useStyles };
