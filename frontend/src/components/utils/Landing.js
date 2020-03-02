import React, { useContext } from 'react';
import AutoGrid from './AutoGrid';
import Query from './Query';
import Database from './Database';
import SQLQuery from './SQLQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import LoadingSpinner from './LoadingSpinner';
import DownloadSection from './DownloadSection';
import { QueryContext } from '../context/query-context';

const Landing = () => {
    const queryContext = useContext(QueryContext);

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
            <div style={{ height: "100px" }}></div>
            <AutoGrid />
            <Paper style={{ marginTop: "20px" }}>
            {queryContext.loading ? (
                <div style={{
                padding: "50px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
                }}>
                    <LoadingSpinner size="70px" thickness={5} />
                </div>
            ) : (
                queryContext.SQLTable.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "50px" }}>
                        <h2>No data selected</h2>
                    </div>
                ) : (
                    <Database data={queryContext.SQLTable} />
                )
            )} 
            </Paper>
            <SQLQuery />
            <Query />
            <DownloadSection />
            <div style={{ height: "100px" }}></div>
        </Container>
      </React.Fragment>
    )
}

export default Landing;