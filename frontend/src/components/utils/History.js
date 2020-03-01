import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from './LoadingSpinner';
import HistoryList from './HistoryList';

export default function History() {
    const [loadedHistory, setLoadedHistory] = useState();
    const [countHistory, setCountHistory] = useState(0);

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/history',
                );
                setLoadedHistory(responseData);
                setCountHistory(responseData.length);               
            } catch (err) {}
        };
        fetchHistory();
    }, [sendRequest]);
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography style={{ paddingTop: "20px", color: "black", fontWeight: "500" }} variant="h4" gutterBottom>
                    History
                </Typography>
                {isLoading && (
                    <div style={{
                        padding: "50px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                        }}>
                            <LoadingSpinner size="70px" thickness={4} />
                    </div>
                )}
                {!isLoading && (
                    <React.Fragment>
                        <hr></hr>
                        {countHistory === 0 && (
                            <div style={{
                                padding: "50px",
                                paddingTop: "200px",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                                }}>
                                    <Typography>Your query history appears here</Typography>
                            </div>
                        )}
                        {loadedHistory && <HistoryList items={loadedHistory} />}
                    </React.Fragment>
                )}
                <div style={{ height: "100px" }}></div>
                <Paper style={{ marginTop: "20px" }}>                
                </Paper>
            </Container>
        </React.Fragment>
    )
}
