import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';

const OrderHistory = ({ orders }) => {
  const columns = [
    {
      id: 'orderCreatedDate',
      lable: 'Order Date',
    },
    {
      id: 'documentID',
      lable: 'Order ID',
    },
    {
      id: 'orderTotal',
      lable: 'Amount',
    },
  ];

  const styles = {
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%',
  };

  const formatText = (columnName, columnValue) => {
    switch (columnName) {
      case 'orderTotal':
        return `${columnValue}`;
      case 'orderCreatedDate':
        const date = new Date(columnValue.nanoseconds);

        return new Intl.DateTimeFormat('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(date);
      default:
        return columnValue;
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, pos) => {
              const { lable } = col;
              return (
                <TableCell key={pos} style={styles}>
                  {lable}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {columns.map((col, pos) => {
                    const columnName = col.id;
                    const columnValue = row[columnName];
                    const formattedText = formatText(columnName, columnValue);

                    return (
                      <TableCell key={pos} style={styles}>
                        {formattedText}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderHistory;
