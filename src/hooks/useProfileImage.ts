import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../apis/axiosInstance";
import DefaultProfile from "../assets/images/default_profileImage.png";

export const useProfileImage = () => {
  const [profileImg, setProfileImg] = useState<string>(DefaultProfile);

  const fetchFromHistory = async () => {
    try {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return DefaultProfile;

      const historyRes = await axiosInstance.get("/api/v2/profile-image/history", {
        headers: { Authorization: token },
      });

      const list = historyRes.data.profileImages || [];
      const validHistory = list.filter((item: any) => item.imageUrl && item.imageUrl.trim() !== "");

      if (validHistory.length > 0) {
        return validHistory[0].imageUrl;
      }
    } catch (err) {
      console.error("히스토리 조회 실패:", err);
    }
    return DefaultProfile;
  };

  const fetchProfileImage = useCallback(async () => {
    const token = sessionStorage.getItem("Authorization");
    if (!token) return;

    try {
      const res = await axiosInstance.get("/api/v2/profile-image", {
        headers: { Authorization: token },
      });
      
      const imgUrl = res.data.imageUrl;

      if (imgUrl && imgUrl.trim() !== "") {
        setProfileImg(imgUrl);
      } else {
        const historyImg = await fetchFromHistory();
        setProfileImg(historyImg);
      }

    } catch (err) {
      const historyImg = await fetchFromHistory();
      setProfileImg(historyImg);
    }
  }, []);

  useEffect(() => {
    fetchProfileImage();
  }, [fetchProfileImage]);

  return { profileImg, setProfileImg, refreshProfile: fetchProfileImage };
};