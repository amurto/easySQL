import React, { useState } from 'react';
import { useHttpClient } from '../hooks/http-hook';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';  
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import TranslateIcon from '@material-ui/icons/Translate';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
            color: 'white'
          },
        flexGrow: 1,
        color: 'white'
    },
    cssLabel: {
        color : 'white'
      },
    
      cssOutlinedInput: {
        color: 'white',
        '&$cssFocused $notchedOutline': {
          borderColor: 'white !important',
        }
      },
    
      cssFocused: {
        color: 'white',
      },
    
      notchedOutline: {
        color: 'white',
        borderWidth: '1px',
        borderColor: 'white !important'
      },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        height: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
        color: 'white',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        width: '100%',
        backgroundColor: '#352961',
        color: '#FFFFFF',
    },
}));

  
const DownloadSection = () => {
    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const classes = useStyles();
    const [translate, setTranslate] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [state, setState] = React.useState({
        database: ''
    });

    const submitTranslate = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/translate',
                'POST',
                JSON.stringify({
                    text: translate
                  }),
                  {
                      'Content-Type': 'application/json'
                  }
              );
              console.log(responseData);
              setTranslatedText(responseData.text);
          } catch(err) {
              console.log(err);
          }
    }

    const handleTranslateChange = event => {
        setTranslate(event.target.value);
    }

    const handleChange = name => event => {
        setState({
          ...state,
          [name]: event.target.value,
        });
    };
    return (
        <Grid container spacing={4} style={{ marginTop: "10px" }}>
            <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                <Paper style={{ backgroundColor: "#352961" }} className={classes.paper}>
                <Typography style={{ color: "white", fontWeight: "500" }} variant="h4" gutterBottom>
                    Translate query
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField 
                        id="outlined-basic" 
                        label="Text" 
                        fullWidth
                        onChange={handleTranslateChange}
                        variant="outlined" 
                        style={{ color: "white", width: "100%" }}
                        onKeyPress={(e) => { 
                            if (e.key === 'Enter') {
                                e.preventDefault(); 
                                submitTranslate();
                            } 
                        }}
                        InputLabelProps={{
                            classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                            }
                        }}
                    />
                </form>
                <div>
                            <Button
                            onClick={submitTranslate}
                            color="secondary"
                            variant="contained"
                            startIcon={<TranslateIcon />}
                            >
                                Translate
                            </Button>
                    </div>
                    <Typography style={{ marginTop: "10px", fontSize: "20", color: "white", fontWeight: "100" }} variant="h5" gutterBottom>
                        Translated Text : {translatedText}
                </Typography>
                </Paper>
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
                <Paper className={classes.paper}>
                <Typography style={{ color: "black", fontWeight: "500" }} variant="h4" gutterBottom>
                    Select Database
                </Typography>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-database-native-simple">Database</InputLabel>
                    <Select
                    native
                    value={state.database}
                    onChange={handleChange('database')}
                    inputProps={{
                        name: 'database',
                        id: 'filled-database-native-simple',
                    }}
                    >
                    <option value=""></option>
                    <option value="Students">Students</option>
                    <option value="Cars">Cars</option>
                    </Select>
                </FormControl>
                {state.database && (
                    <div>
                        <a style={{ textDecoration: "none" }} href={state.database === 'Students' ? 'https://easysql.herokuapp.com/students-data.csv' : 'https://easysql.herokuapp.com/cars-data.csv'}>
                            <Button
                            variant="contained"
                            className={classes.button}
                            startIcon={<GetAppIcon />}
                            >
                                Download .csv
                            </Button>
                        </a>
                    </div>
                )}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default DownloadSection;