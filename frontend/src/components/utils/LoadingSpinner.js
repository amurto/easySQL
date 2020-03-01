import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    color: '#352961',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const LoadingSpinner = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="inherit" size={props.size} thickness={props.thickness} />
    </div>
  );
}

export default LoadingSpinner;