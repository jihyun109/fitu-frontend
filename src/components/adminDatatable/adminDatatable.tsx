import React from "react";
import styled from "styled-components";
import trashIcon from "../../assets/images/Trash.png";

interface AdminDataTableProps {
  columns: string[];
  columnKeys: string[];
  data: Record<string, any>[];
  showBanButtons?: boolean;
  showDeleteButton?: boolean;
  onBan?: (id: string) => void;
  onUnban?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const AdminDataTable: React.FC<AdminDataTableProps> = ({
  columns,
  columnKeys,
  data,
  showDeleteButton = true,
  showBanButtons = false,
  onDelete,
  onBan,
  onUnban,
}) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <Th key={index}>{col}</Th>
            ))}
            {(showBanButtons || showDeleteButton) && <Th>관리</Th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <Tr key={`${row.id}-${row.date}-${idx}`}>
              {columnKeys.map((key, colIdx) => (
                <Td key={`${row.id}-${key}-${idx}`}>{row[key]}</Td>
              ))}
              <Td>
                {showBanButtons && (
                  <>
                    <BanButton onClick={() => onBan?.(row.id)}>
                      계정 정지
                    </BanButton>
                    <UnbanButton onClick={() => onUnban?.(row.id)}>
                      정지 해제
                    </UnbanButton>
                  </>
                )}
                {showDeleteButton && (
                  <DeleteButton onClick={() => onDelete?.(row.id)}>
                    <img
                      src={trashIcon}
                      alt="삭제"
                      style={{ width: 22, height: 22 }}
                    />
                  </DeleteButton>
                )}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default AdminDataTable;

const TableContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-bottom: 1px solid #d2d2d2;
  table-layout: fixed;
`;

const Th = styled.th`
  text-align: center;
  padding: 12px 8px 16px 8px;

  white-space: nowrap;
  font-size: 20;
  font-weight: 400;
  color: #7e7e7e;
`;

const Tr = styled.tr`
  height: 60px;
  &:last-child td {
    padding-bottom: 18px;
  }
  &:first-child td {
    padding-top: 18px;
    border-top: 1px solid #d2d2d2;
  }
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td`
  text-align: center;
  padding: 12px 16px;

  white-space: nowrap;
  font-size: 20;
  font-weight: 500;
  color: #000000;
`;

const Button = styled.button`
  margin-right: 10px;
  height: 32px;
  padding: 4px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background: transparent;
`;

const BanButton = styled(Button)`
  background-color: #ffffff;
  border: 1px solid #ff4d4f;
  color: #ff4d4f;
  &:hover {
    background-color: #ff4d4f;
    color: #ffffff;
  }
`;

const UnbanButton = styled(Button)`
  background-color: #ffffff;
  border: 1px solid #32b894;
  color: #32b894;
  &:hover {
    background-color: #32b894;
    color: #ffffff;
  }
`;
