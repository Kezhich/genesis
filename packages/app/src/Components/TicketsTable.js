import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  heading: {
      fontSize: '32px',
      fontWeight: '600',
      fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  }
});


export default function DenseTable({ticketsData}) {
  const classes = useStyles();

  const rows = ticketsData

  const handleClick = (idx) => {
          rows[idx].status = rows[idx].status ? 0 : 1
        } 

  return (
    <React.Fragment>
    <div className={classes.heading}>Созданные тикеты</div>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell >Название</TableCell>
            <TableCell align="right">Продукт</TableCell>
            <TableCell align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell  component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.productName}</TableCell>
              <TableCell align="right" onClick={(e) =>handleClick(index)}>{row.status ? 'решено' : 'не решено'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}