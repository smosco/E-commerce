import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from '@mui/material';
import { tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
}));

const OrderHistory = ({ orders }) => {
  const navigate = useNavigate();

  const columns = [
    { id: 'orderCreatedDate', label: '주문날짜' },
    { id: 'documentID', label: '주문번호' },
    { id: 'orderTotal', label: '총합계' },
  ];

  const formatText = (columnName, columnValue) => {
    if (columnName === 'orderTotal') {
      return `${columnValue.toLocaleString()}원`; // 금액에 세 자리마다 쉼표 추가
    }

    if (columnName === 'orderCreatedDate') {
      const date = new Date(columnValue.seconds * 1000);
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    }

    return columnValue;
  };

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
          {orders?.length > 0 ? (
            orders.map((row) => (
              <StyledTableRow
                key={row.documentID}
                onClick={() => navigate(`/order/${row.documentID}`)}
              >
                {columns.map((col) => {
                  const formattedText = formatText(col.id, row[col.id]);
                  return (
                    <StyledTableCell key={col.id}>
                      {formattedText}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={columns.length} align='center'>
                주문 내역이 없습니다.
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderHistory;
