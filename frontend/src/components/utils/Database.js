import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#352961',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
}))(TableRow);
  
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const Database = props => {
    const classes = useStyles();

    const RenderRow = (props) =>{
        return props.keys.map((key, index)=>{
            return <StyledTableCell key={props.data[key]}>{props.data[key]}</StyledTableCell>
        })
    }
    
    const getKeys = () => {
        return Object.keys(props.data[0]);
    }

    const getHeader = () => {
        var keys = getKeys();
            return keys.map((key, index)=>{
            return <StyledTableCell key={key}>{key.toUpperCase()}</StyledTableCell>
            })
    }

    const getRowsData = () => {
        var items = props.data;
            var keys = getKeys();
            return items.map((row, index)=>{
            return <StyledTableRow key={index}><RenderRow key={index} data={row} keys={keys}/></StyledTableRow>
            })
    }

    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
              {getHeader()}
          </TableRow>
          </TableHead>
          <TableBody>
              {getRowsData()}
          </TableBody>
          </Table>
        </TableContainer>
    )
}

export default Database;

