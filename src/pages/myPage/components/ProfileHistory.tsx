import { useState, useRef, useEffect } from "react";
import ProfileCropper from "./ProfileCropper";
import * as S from "./styles/ProfileHistory.styled";
import DefaultProfile from "../../../assets/images/default_profileImage.png";
import axiosInstance from "../../../apis/axiosInstance";

interface ProfileHistoryProps {
  onClose: () => void;
  onImageChange: (img: string) => void;
}

interface HistoryItem {
  url: string;
}

export default function ProfileHistory({ onClose, onImageChange }: ProfileHistoryProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [historyImages, setHistoryImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const res = await axiosInstance.get<HistoryItem[]>('/api/v2/profile-image/history', {
          headers: { Authorization: token },
        });
        
        const validUrls = res.data
          .filter(item => item.url && item.url.trim() !== "")
          .map(item => item.url);

        setHistoryImages(validUrls);
        
      } catch (err) {
        console.error("프로필 히스토리 에러:", err);
      }
    };

    fetchHistory();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result);
          setShowCropper(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setSelectedImage(null);
  };

  const handleCropComplete = async (croppedImage: string) => {
    const token = sessionStorage.getItem("Authorization");
    if (!token) return;

    try {
      const blob = await (await fetch(croppedImage)).blob();
      
      const formData = new FormData();
      formData.append("image", blob, "profile.jpg");

      const res = await axiosInstance.post('/api/v2/profile-image', formData, {
        headers: { 
          Authorization: token,
        },
      });

      const newUrl = res.data.imageUrl || DefaultProfile;
      const updated = [newUrl, ...historyImages].slice(0, 10);
      setHistoryImages(updated);
      onImageChange(newUrl);
      onClose();
    } catch (err) {
      console.error("이미지 업로드 에러:", err);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setShowCropper(false);
      setSelectedImage(null);
    }
  };

  const handleDelete = async (imgUrl: string) => {
    if (!window.confirm("이 프로필 이미지를 삭제하시겠습니까?")) return;
    const token = sessionStorage.getItem("Authorization");
    if (!token) return;

    try {
      await axiosInstance.delete('/api/v2/profile-image', {
        headers: { 
          Authorization: token,
          "Content-Type": "application/json"
        },
        data: { imageUrl: imgUrl }, 
      });
      const updated = historyImages.filter((url) => url !== imgUrl);
      setHistoryImages(updated);

      if (selectedImage === imgUrl) {
         const fallback = updated.length > 0 ? updated[0] : DefaultProfile;
         onImageChange(fallback);
      }

    } catch (err) {
      console.error("이미지 삭제 에러:", err);
      alert("이미지 삭제에 실패했습니다.");
    }
  };

  return (
    <S.Overlay>
      {!showCropper && (
        <S.Modal>
          <S.CloseButton onClick={onClose}>✖</S.CloseButton>
          <S.Title>프로필 이미지 변경</S.Title>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />

          <S.UploadButton onClick={() => fileInputRef.current?.click()}>
            이미지 업로드
          </S.UploadButton>

          {historyImages.length > 0 && (
            <S.HistorySection>
              <S.HistoryTitle>이전 이미지</S.HistoryTitle>
              <S.HistoryList>
                {historyImages.map((img, idx) => (
                  <S.HistoryItemWrapper key={idx}>
                    <S.HistoryImage
                      src={img || DefaultProfile}
                      alt={`history-${idx}`}
                      onClick={() => {
                        onImageChange(img || DefaultProfile);
                        onClose();
                      }}
                    />
                    <S.DeleteHistoryButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(img);
                      }}
                    >
                      ✖
                    </S.DeleteHistoryButton>
                  </S.HistoryItemWrapper>
                ))}
              </S.HistoryList>
            </S.HistorySection>
          )}
        </S.Modal>
      )}

      {showCropper && selectedImage && (
        <ProfileCropper
          imageSrc={selectedImage}
          onCancel={handleCropCancel}
          onCropComplete={handleCropComplete}
        />
      )}
    </S.Overlay>
  );
}