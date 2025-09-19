import React, { useState } from "react";
import styled from "styled-components";

import SchoolSearch from "../../components/adminSearch/adminSearchSchool";
import DataTable from "../../components/adminDatatable/adminDatatable";
import Pagination from "../../components/adminPagination/adminPagination";

// prettier-ignore
const dummyData = [
  { id: "user4", date: "2025-09-06", school: "연세대학교", exercise: "풀업" },
  { id: "user5", date: "2025-09-05", school: "한양대학교", exercise: "푸쉬업" },
  { id: "user6", date: "2025-09-04", school: "성균관대학교", exercise: "런지" },
  { id: "user7", date: "2025-09-03", school: "경희대학교", exercise: "플랭크" },
  { id: "user4", date: "2025-09-06", school: "연세대학교", exercise: "풀업" },
  { id: "user5", date: "2025-09-05", school: "한양대학교", exercise: "푸쉬업" },
  { id: "user6", date: "2025-09-04", school: "성균관대학교", exercise: "런지" },
  { id: "user7", date: "2025-09-03", school: "경희대학교", exercise: "플랭크" },
  { id: "user6", date: "2025-09-04", school: "성균관대학교", exercise: "런지" },
  { id: "user7", date: "2025-09-03", school: "경희대학교", exercise: "플랭크" },
];

const AdminMember: React.FC = () => {
  const [active, setActive] = useState<"request" | "post" | "member">("member");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const columns = ["id", "date", "school", "exercise"];
  const columnNames = ["아이디", "날짜", "학교명", "운동명"];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Member>
        <SchoolSearch onSchoolSelect={setSelectedSchool} />
      </Member>

      <Selected>{selectedSchool}</Selected>

      <DataTable
        columns={columnNames}
        columnKeys={columns}
        data={currentData}
        showDeleteButton={false}
        showBanButtons={true}
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

export default AdminMember;

const Member = styled.div`
  margin-top: 20px;
`;

const Selected = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;
