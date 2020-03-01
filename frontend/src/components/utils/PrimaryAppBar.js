import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const PrimaryAppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#352961" }} position="static">
        <Toolbar>
          <img src={logo} alt="logo" height="40" width="40" />
          <Typography variant="h6" style={{ paddingLeft: "10px" }} className={classes.title}>
            easySQL
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PrimaryAppBar;