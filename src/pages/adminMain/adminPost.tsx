import React, { useState } from "react";
import styled from "styled-components";
import AdminHeader from "../../components/adminHeader/adminHeader";
import IdSearch from "../../components/adminSearch/adminSearchId";
import DataTable from "../../components/adminDatatable/adminDatatable";
import Pagination from "../../components/adminPagination/adminPagination";

// prettier-ignore
const dummyData = [
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
  {id: "user7",date: "2025-09-03",school: "한세대학교",contents: "가나다라마바",},
];

const AdminPost: React.FC = () => {
  const [active, setActive] = useState<"request" | "post" | "member">("post");
  const [selectedId, setSelectedId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const columns = ["id", "date", "school", "contents"];
  const columnNames = ["아이디", "날짜", "학교명", "내용"];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <AdminHeader active={active} setActive={setActive} />

      <Post>
        <IdSearch onIdSelect={setSelectedId} />
      </Post>

      <Selected>{selectedId}</Selected>
      <DataTable
        columns={columnNames}
        columnKeys={columns}
        data={dummyData}
        showDeleteButton={true}
        showBanButtons={false}
        onDelete={(id) => console.log("삭제:", id)}
        onBan={(id) => console.log("계정 정지:", id)}
        onUnban={(id) => console.log("정지 해제:", id)}
      />
      <Pagination
        totalItems={dummyData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default AdminPost;

const Post = styled.div`
  margin-top: 20px;
`;
const Selected = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;
