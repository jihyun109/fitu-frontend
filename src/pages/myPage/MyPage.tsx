import { useState, useEffect } from "react";
import MyPageLayout from "./MyPageLayout";
import {
  TopSection,
  BodyInfoSection,
  SectionTitle,
  ProfileWrapper,
  Button,
  Row,
} from "./MyPage.styled";
import Profile from "../../assets/images/default_profileImage.png";
import BodyInput from "./components/BodyInput";
import ProfileImage from "./components/ProfileImage";
import ProfileHistory from "./components/ProfileHistory";
import LineChart from "./components/BodyStatLineChart";
import Calendar from "./components/Calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { DeleteAccountModal } from "./components/DeleteAccount";

type WorkoutDetail = {
  name: string;
  categoryId: number;
  sets: number;
  weight: number;
  repsPerSet: number;
};

type WorkoutRecord = {
  date: string;
  workout: WorkoutDetail[];
};

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"record" | "profile">("record");
  const [bodyData, setBodyData] = useState({
    height: "",
    weight: "",
    muscle: "",
    bodyFat: "",
    userName: "",
  });

  const [profileImg, setProfileImg] = useState<string>(Profile);
  const [showHistory, setShowHistory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleDeleteConfirm = () => {
  setShowDeleteModal(false);
  alert("회원탈퇴 요청 실행 (실제 호출 x)");
};

  useEffect(() => {
    const recentBodyData = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const res = await fetch("https://hanseifitu.shop/api/v2/physical-infos", {
          headers: { Authorization: `${token}` },
        });
        if (!res.ok) throw new Error("최신 신체 정보 get 실패");
        const data = await res.json();
        setBodyData({
          height: data.height?.toString() || "",
          weight: data.weight?.toString() || "",
          muscle: data.muscle?.toString() || "",
          bodyFat: data.bodyFat?.toString() || "",
          userName: data.userName || "",
        });
      } catch (error) {
        console.error("신체 정보 조회 에러:", error);
      }
    };
    recentBodyData();
  }, []);

  const inputChange = (id: string, value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    setBodyData((prev) => ({ ...prev, [id]: numeric }));
  };

  const saveLogic = async () => {
    const token = sessionStorage.getItem("Authorization");
    if (!token) return;

    const payload = {
      height: Number(bodyData.height) || 0,
      weight: Number(bodyData.weight) || 0,
      muscle: Number(bodyData.muscle) || 0,
      bodyFat: Number(bodyData.bodyFat) || 0,
    };

    try {
      const res = await fetch("https://hanseifitu.shop/api/v2/physical-infos", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("저장 실패");
      alert("수정 완료되었습니다!");
      console.log("저장된 데이터:", payload);
    } catch (err) {
      console.error("저장 에러:", err);
      alert("저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    const latestProfile = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const res = await fetch("https://hanseifitu.shop/api/v2/profile-image", {
          headers: { Authorization: `${token}` },
        });
        if (!res.ok) throw new Error("이미지 불러오기 실패");
        const data = await res.json();
        setProfileImg(data.imageUrl?.trim() || Profile);
      } catch (err) {
        console.error("프로필 이미지 에러:", err);
        setProfileImg(Profile);
      }
    };
    latestProfile();
  }, []);

  const imageChange = (newImage: string) => setProfileImg(newImage);

  const [month, setMonth] = useState<Date>(new Date());
  const [records, setRecords] = useState<WorkoutRecord[]>([]);

  useEffect(() => {
    setRecords([
      {
        date: format(new Date(), "yyyy-MM-dd"),
        workout: [
          { name: "벤치프레스", categoryId: 1, sets: 3, weight: 60, repsPerSet: 10 },
        ],
      },
    ]);
  }, []);

  return (
    <MyPageLayout>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "40px", borderBottom: "1px solid #CED4D8", }}>
        <BackButton />

        <Button
          onClick={() => setActiveTab("record")}
          style={{
            color: activeTab === "record" ? "#17A1FA" : "#CED4DB",
            background: "#FFFFFF",
            borderBottom: `2px solid ${
              activeTab === "record" ? "#17A1FA" : "#CED4DB"
            }`,
            borderRadius: 0,
          }}
        >
          기록
        </Button>
        <Button
          onClick={() => setActiveTab("profile")}
          style={{
            color: activeTab === "profile" ? "#17A1FA" : "#CED4DB",
            background: "#FFFFFF",
            borderBottom: `2px solid ${
              activeTab === "profile" ? "#17A1FA" : "#CED4DB"
            }`,
            borderRadius: 0,
          }}
        >
          프로필
        </Button>
      </div>
      
      {activeTab === "record" && (
        <div>
          <div
            style={{
              width: "100%",
              height: "10px",
              backgroundColor: "#F2F4F5",
            }}
          />
          <Calendar records={records} month={month} onMonthChange={setMonth} />
        </div>
      )}

      {activeTab === "profile" && (
        <>
          <div
            style={{
              width: "100%",
              height: "10px",
              backgroundColor: "#F2F4F5",
            }}
          />
          <TopSection>
            <BodyInfoSection>
              <SectionTitle>{bodyData.userName || "사용자 이름 손실"}</SectionTitle>
              <Row>
                <BodyInput
                  name="키"
                  id="height"
                  unit="cm"
                  value={bodyData.height}
                  onChange={inputChange}
                />
                <BodyInput
                  name="체중"
                  id="weight"
                  unit="kg"
                  value={bodyData.weight}
                  onChange={inputChange}
                />
              </Row>
              <Row>
                <BodyInput
                  name="골격근량"
                  id="muscle"
                  unit="kg"
                  value={bodyData.muscle}
                  onChange={inputChange}
                />
                <BodyInput
                  name="체지방률"
                  id="bodyFat"
                  unit="%"
                  value={bodyData.bodyFat}
                  onChange={inputChange}
                />
              </Row>
            </BodyInfoSection>

            <ProfileWrapper style={{ position: "relative" }}>
              <ProfileImage
                viewImage={profileImg}
                onClick={() => setShowHistory(true)}
              />
              {showHistory && (
                <ProfileHistory
                  onClose={() => setShowHistory(false)}
                  onImageChange={imageChange}
                />
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: -55,
                  display: "flex",
                  gap: "13px",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    fontSize: "12px",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    id="private"
                    style={{ color: "#17A1FA" }}
                  />
                  프로필 비공개
                </label>

                <Button
                  onClick={saveLogic}
                  style={{
                    fontSize: "11px",
                    width: "44px",
                    height: "22px",
                    border: "1px solid black",
                    borderRadius: "40%",
                    backgroundColor: "white",
                    color: "black",
                    marginBottom: "15px",
                  }}
                >
                  수정
                </Button>
              </div>
            </ProfileWrapper>
          </TopSection>

          <div style={{ width: "100%", height: "10px", backgroundColor: "#F2F4F5",}} />
          <LineChart />
          <div style={{ width: "100%", height: "10px", backgroundColor: "#F2F4F5",}} />

          <div
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "white",
              borderBottom: "1px solid #CED4DB",
              display: "flex",
              alignItems: "center",
              paddingLeft: "12px",
              cursor: "pointer",
            }}
            role="button"
            onClick={() => navigate("/invite")}
          >
            친구 초대 코드
          </div>
          <div
            style={{ width: "100%", height: "60px", backgroundColor: "white" }}
            role="button"
            onClick={() => setShowDeleteModal(true)}
          >
            <p> &nbsp;&nbsp; 회원 탈퇴 </p>
          </div>
          <DeleteAccountModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        </>
      )}
    </MyPageLayout>
  );
}
