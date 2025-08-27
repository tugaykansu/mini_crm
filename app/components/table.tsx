import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem;
  text-align: left;
`;

export const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  background-color: #f3f4f6;
  font-weight: bold;
`;
