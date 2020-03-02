import React, { useContext } from 'react';
import { QueryContext } from '../context/query-context';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

const SQLQuery = () => {
    const classes = useStyles();
    const queryContext = useContext(QueryContext);
    const clearSQLQuery = () => {
        queryContext.sqlqueried("");
    }

    return (
        <React.Fragment>
            {queryContext.sql && queryContext.sql !== "error" && (
                <div className={classes.root}>
                    <Alert style={{ marginTop: "20px", backgroundColor: "#cbffcb" }} onClose={clearSQLQuery} severity="success" variant="outlined">
                        {queryContext.sql.toUpperCase()}
                    </Alert>
                </div>
            )}
            {queryContext.sql === "error" && (
                <div className={classes.root}>
                    <Alert style={{ marginTop: "20px", backgroundColor: "#ffcccb" }} onClose={clearSQLQuery} severity="error" variant="outlined">
                        Oops! Looks like we cannot identify the query
                    </Alert>
                </div>
            )}
        </React.Fragment>
    )
}

export default SQLQuery;