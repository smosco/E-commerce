import React, { useEffect } from 'react';
import useOrderStore from '../../zustand/orderStore';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import { tableCellClasses } from '@mui/material';
import { formatPrice } from '../../utils';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    padding: '16px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const OrderDetails = ({ order }) => {
  const orderItems = order && order.orderItems;
  const { clearOrderDetails } = useOrderStore();

  const columns = [
    { id: 'thumbnail', label: '이미지' },
    { id: 'name', label: '상품명' },
    { id: 'price', label: '가격' },
    { id: 'quantity', label: '수량' },
  ];

  const formatText = (columnName, columnValue) => {
    switch (columnName) {
      case 'price':
        return `${formatPrice(columnValue)}원`;
      case 'thumbnail':
        return <img src={columnValue} width={200} alt='thumbnail' />;
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell key={col.id}>{col.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, idx) => (
              <StyledTableRow key={idx}>
                {columns.map((col) => {
                  const columnName = col.id;
                  const columnValue = row[columnName];
                  return (
                    <StyledTableCell key={col.id}>
                      {formatText(columnName, columnValue)}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetails;
