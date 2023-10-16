'use client';

import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    color: #ccc;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.7rem;
  }

  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
  return <StyledTable>{children}</StyledTable>;
};

export default Table;
