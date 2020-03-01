import { createContext } from 'react';

export const QueryContext = createContext({
    query: "",
    queried: (queryText) => {},
    SQLTable: [],
    setSQLTableData: (tabledata) => {},
    sql: "",
    sqlqueried: (sqlquery) => {},
    loading: false,
    loadingTable: (loadTable) => {}
});