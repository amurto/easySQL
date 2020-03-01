import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

  
export default function Visualization() {
    const classes = useStyles();
    return (
        <React.Fragment>
            
            <CssBaseline />
            <Container maxWidth="lg">
                <div style={{ height: "100px" }}></div>
                <Grid container spacing={4}>
                <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <iframe title="tp" width="500" height="500" frameBorder="0" scrolling="no" src="//plot.ly/~Sarvesh1999/8.embed"></iframe>
                    </Paper>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <iframe title="tp" width="500" height="500" frameBorder="0" scrolling="no" src="//plot.ly/~Sarvesh1999/10.embed"></iframe>
                    </Paper>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <iframe title="tp" width="500" height="500" frameBorder="0" scrolling="no" src="//plot.ly/~Sarvesh1999/16.embed"></iframe>
                    </Paper>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <iframe title="tp" width="500" height="500" frameBorder="0" scrolling="no" src="//plot.ly/~Sarvesh1999/18.embed"></iframe>
                    </Paper>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <iframe title="tp" width="500" height="500" frameBorder="0" scrolling="no" src="//plot.ly/~Sarvesh1999/12.embed"></iframe>
                    </Paper>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <iframe title="tp" width="500" height="500" frameBorder="0" scrolling="no" src="//plot.ly/~Sarvesh1999/14.embed"></iframe>
                    </Paper>
                </Grid>
                </Grid>
                <div style={{ height: "100px" }}></div>
            </Container>
        </React.Fragment>
    )
}
