import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getTableData from '../../api';
import { useEffect } from 'react';
import { useState } from 'react';

const TableComponent = () => {
  const [rows, setRows] = useState([]);
  const [displayedRows, setDisplayedRows] = useState([]);
  const [displayedRowsCount, setDisplayedRowsCount] = useState(100);

  const disabledButton = rows.length <= displayedRowsCount;

  const handleDisplayMoreRows = () => {
    const notDisplayedRowsCount = rows.length - displayedRowsCount;

    const updatedDisplayedRowsCount =
      notDisplayedRowsCount >= 100 ? displayedRowsCount + 100 : displayedRowsCount + notDisplayedRowsCount;

    setDisplayedRows([...displayedRows, ...rows.slice(displayedRowsCount, updatedDisplayedRowsCount)]);
    setDisplayedRowsCount(updatedDisplayedRowsCount);
  };

  const getData = async () => {
    const rowsData = await getTableData();
    setRows(rowsData);
    setDisplayedRows(rowsData.slice(0, displayedRowsCount));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Cors</TableCell>
              <TableCell align="center">Link</TableCell>
              <TableCell align="center">API</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, id) => (
              <TableRow key={row.link} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row['Category']}
                </TableCell>
                <TableCell align="center">{row['Description']}</TableCell>
                <TableCell align="center">{row['Cors']}</TableCell>
                <TableCell align="center">
                  <a href={row.link}>{row['Link']}</a>
                </TableCell>
                <TableCell align="center">{row['API']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        style={{
          display: 'flex',
          backgroundColor: 'black',
          color: 'white',
          fontSize: '20px',
          padding: '10px 60px',
          borderRadius: '5px',
          margin: '50px auto',
          cursor: disabledButton ? 'not-allowed' : 'pointer',
        }}
        onClick={handleDisplayMoreRows}
        disabled={disabledButton}
      >
        Show More Rows
      </button>
    </>
  );
};

export default TableComponent;
