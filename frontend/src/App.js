import React, { useState, useCallback } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import { QueryContext } from './components/context/query-context';

import PrimaryAppBar from './components/utils/PrimaryAppBar';
import Landing from './components/utils/Landing';
import BottomNav from './components/utils/BottomNav';
// import Visualization from './components/utils/Visualization';
// import History from './components/utils/History';
import SpeedDial from './components/utils/SpeedDial';

const Visualization = React.lazy(() => import('./components/utils/Visualization'));
const History = React.lazy(() => import('./components/utils/History'));

const App = () => {
  const [query, setQuery] = useState("");
  const [SQLTable, setSQLTable] = useState([]);
  const [sql, setSQL] = useState("");
  const [loading, setLoading] = useState(false);

  const queried = useCallback((queryText) => {
    setQuery(queryText);
  }, []);

  const setSQLTableData = useCallback((tabledata) => {
    setSQLTable(tabledata);
  }, [])

  const sqlqueried = useCallback((sqlquery) => {
    setSQL(sqlquery);
  }, [])

  const loadingTable = useCallback((loadTable) => {
    setLoading(loadTable)
  }, [])

  let routes;


  routes = (
    <Switch>
      <Route path="/" exact>
          <Landing />
          <SpeedDial />
      </Route>
      <Route path="/visual">
          <Visualization />
          <SpeedDial />
      </Route>
      <Route path="/history">
          <History />
          <SpeedDial />
      </Route>
      <Redirect to="/" />
    </Switch>
  )

  return (
    <QueryContext.Provider 
      value={{ 
        query: query, 
        queried: queried, 
        SQLTable: SQLTable, 
        setSQLTableData: setSQLTableData, 
        sql: sql, 
        sqlqueried: sqlqueried,
        loading: loading,
        loadingTable: loadingTable 
    }}>
      <Router>
        <PrimaryAppBar />
        <div style={{ backgroundColor: "#d3d3d3", minHeight: "100vh" }}>
        {routes}
        </div>
        <BottomNav />
      </Router>
    </QueryContext.Provider>
  );
}

export default App;
