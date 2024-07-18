import React, { useEffect } from 'react';
import useOrderStore from '../../zustand/orderStore';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const OrderDetails = ({ order }) => {
  const orderItems = order && order.orderItems;
  const { clearOrderDetails } = useOrderStore();
  const columns = [
    {
      id: 'thumbnail',
      lable: '',
    },
    {
      id: 'name',
      lable: 'Name',
    },
    {
      id: 'price',
      lable: 'Price',
    },
    {
      id: 'quantity',
      lable: 'Quantity',
    },
  ];

  const styles = {
    fontSize: '16px',
    width: '10%',
  };

  const formatText = (columnName, columnValue) => {
    switch (columnName) {
      case 'price':
        return `${columnValue}`;
      case 'thumbnail':
        return <img src={columnValue} width={250} alt='thumbnail' />;

      default:
        return columnValue;
    }
  };

  useEffect(() => {
    return () => {
      clearOrderDetails();
    };
  }, [clearOrderDetails]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, pos) => {
              return (
                <TableCell key={pos} style={styles}>
                  {col.lable}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {columns.map((col, pos) => {
                    const columnName = col.id;
                    const columnValue = row[columnName];

                    return (
                      <TableCell key={pos} style={styles}>
                        {formatText(columnName, columnValue)}
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

export default OrderDetails;
