import React, { useContext } from 'react';
import { QueryContext } from '../context/query-context';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import MicButton from './MicButton';
import { useHttpClient } from '../hooks/http-hook';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '30px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fullwidth: true,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Query = () => {
    const classes = useStyles();

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const queryContext = useContext(QueryContext);
    const handleInput = (e) => {
        queryContext.queried(e.target.value);
    }

    const sendQueryHandler = async () => {
      let query = queryContext.query;
      console.log(query);
      queryContext.loadingTable(true);
      try {
        const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/',
            'POST',
            JSON.stringify({
                sentence: query
              }),
              {
                  'Content-Type': 'application/json'
              }
          );
          console.log(responseData);
          if (!responseData.query) {
              queryContext.sqlqueried(0);
              queryContext.loadingTable(false);
          } else {
              queryContext.sqlqueried(responseData.query)
              queryContext.setSQLTableData(responseData.results);
              queryContext.loadingTable(false);
          }
      } catch(err) {
          console.log(err);
          queryContext.loadingTable(false);
      }     
    }

    return (
        <Paper component="form" className={classes.root}>
        <InputBase
            className={classes.input}
            placeholder="Type your Query here"
            inputProps={{ 'aria-label': 'type your query here' }}
            value={queryContext.query}
            onChange={handleInput}
            fullWidth
        />
        <IconButton onClick={sendQueryHandler} className={classes.iconButton} aria-label="send">
            <SendIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
          <MicButton iconButton={classes.iconButton} />
        </Paper>
    );
}

export default Query;