import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import flowchart from './flowchart.png';
import brain from './brain.png';
import worldwide from './worldwide.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  },
}));

const AutoGrid = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
          <Paper style={{ backgroundColor: '#352961' }} className={classes.paper}>
            <img src={brain} height="300" width="300" alt="brain" />
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
          <Paper style={{ backgroundColor: '#58b8d1', margin: 'auto' }} className={classes.paper}>
            <div style={{ marginTop: "50px" }}>
              <img src={flowchart} height="150" width="300" alt="flowchart" />
              <h1 style={{ color: "#352961" }}>SPEECH RECOGNITION</h1>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
          <Paper className={classes.paper}>
            <div style={{ marginTop: "50px" }}>
              <img src={worldwide} height="150" width="150" alt="worldwide" />
              <h1 style={{ color: "#351961" }}>MULTILINGUAL SUPPORT</h1>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AutoGrid;