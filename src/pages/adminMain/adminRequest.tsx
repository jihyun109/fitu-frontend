import React, { useState } from "react";
import styled from "styled-components";
import AdminHeader from "../../components/adminHeader/adminHeader";
import AdminTab, { AdminTabType } from "../../components/adminTab/adminTab";
import DataTable from "../../components/adminDatatable/adminDatatable";
import Pagination from "../../components/adminPagination/adminPagination";

// prettier-ignore
const dummyAddExercise = [
  { id: "user1", date: "2025-09-10", school: "한세대학교", exercise: "벤치프레스" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", exercise: "스쿼트" },
  { id: "user3", date: "2025-09-08", school: "연세대학교", exercise: "데드리프트" },
  { id: "user1", date: "2025-09-10", school: "한세대학교", exercise: "벤치프레스" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", exercise: "스쿼트" },
  { id: "user3", date: "2025-09-08", school: "연세대학교", exercise: "데드리프트" },
  { id: "user1", date: "2025-09-10", school: "한세대학교", exercise: "벤치프레스" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", exercise: "스쿼트" },
  { id: "user3", date: "2025-09-08", school: "연세대학교", exercise: "데드리프트" },
  { id: "user1", date: "2025-09-10", school: "한세대학교", exercise: "벤치프레스" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", exercise: "스쿼트" },
  { id: "user3", date: "2025-09-08", school: "연세대학교", exercise: "데드리프트" },
  { id: "user1", date: "2025-09-10", school: "한세대학교", exercise: "벤치프레스" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", exercise: "스쿼트" },
  { id: "user3", date: "2025-09-08", school: "연세대학교", exercise: "데드리프트" },
  { id: "user1", date: "2025-09-10", school: "한세대학교", exercise: "벤치프레스" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", exercise: "스쿼트" },
  { id: "user3", date: "2025-09-08", school: "연세대학교", exercise: "데드리프트" },
  { id: "user1", date: "2025-09-10", school: "한세대학교", exercise: "벤치프레스" },

];

// prettier-ignore
const dummyReportPost = [
  { id: "user1", date: "2025-09-10", school: "한세대학교", post: "오늘 먹은 식단 충격적인 실화..!" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", post: "헬스 후기 공유!" },
  { id: "user3", date: "2025-09-08", school: "고려대학교", post: "러닝 후기!" },
];

// prettier-ignore
const dummyExerciseCertification = [
  { id: "user1", date: "2025-09-10", school: "한세대학교", exercise: "벤치프레스" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", exercise: "스쿼트" },
];

// prettier-ignore
const dummyMembershipReport = [
  { id: "user1", date: "2025-09-10", school: "한세대학교", reportedpost: "www.fitu.abcdefg/123132" },
  { id: "user2", date: "2025-09-09", school: "서울대학교", reportedpost: "www.fitu.abcdefg/123132" },
];

const AdminRequest: React.FC = () => {
  const [active, setActive] = useState<"request" | "post" | "member">(
    "request"
  );
  const [activeTab, setActiveTab] = useState<AdminTabType>("addEquipment");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dataMap = {
    addEquipment: dummyAddExercise,
    reportPost: dummyReportPost,
    exerciseCertification: dummyExerciseCertification,
    membershipReport: dummyMembershipReport,
  };

  const columnsMap = {
    addEquipment: ["id", "date", "school", "exercise"],
    reportPost: ["id", "date", "school", "post"],
    exerciseCertification: ["id", "date", "school", "exercise"],
    membershipReport: ["id", "date", "school", "reportedpost"],
  };

  const columnNamesMap = {
    addEquipment: ["아이디", "날짜", "학교명", "운동명"],
    reportPost: ["아이디", "날짜", "학교명", "게시글 제목"],
    exerciseCertification: ["아이디", "날짜", "학교명", "운동명"],
    membershipReport: ["아이디", "날짜", "학교명", "신고된 게시물"],
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataMap[activeTab].slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <AdminHeader active={active} setActive={setActive} />
      <AdminTab
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
      />
      <Request>
        <DataTable
          columns={columnNamesMap[activeTab]}
          columnKeys={columnsMap[activeTab]}
          data={currentData}
          showDeleteButton
          showBanButtons={false}
          onDelete={(id) => console.log("삭제:", id)}
        />
        <Pagination
          totalItems={dataMap[activeTab].length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Request>
    </>
  );
};

export default AdminRequest;

const Request = styled.div`
  margin-top: 20px;
  width: 100%;
`;
