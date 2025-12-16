import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import VideoIcon from "../../../assets/images/video.png";

const VideoInput = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!videoRef.current) return;

    videoRef.current.play();
    setIsPlaying(true);
  };

const handleDelete = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  setIsPlaying(false);
  setVideoUrl(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  return (
    <Container>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="video/*"
        id="video-upload"
        onChange={handleVideoChange}
      />

      <UploadLabel htmlFor={!videoUrl ? "video-upload" : undefined}>
        {videoUrl ? (
          <>
            <VideoPreview
              ref={videoRef}
              src={videoUrl}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {!isPlaying && (
              <PlayButton onClick={handlePlay}>▶</PlayButton>
            )}

            <DeleteButton onClick={handleDelete}>✕</DeleteButton>
          </>
        ) : (
          <>
            <Icon src={VideoIcon} alt="upload icon" />
            영상첨부
          </>
        )}
      </UploadLabel>
    </Container>
  );
};

export default VideoInput;
const Container = styled.div`
  width: 100%;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  margin-top: 20px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-height: 200px;
  max-height: 300px;

  background-color: #f2f4f5;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  font-size: 20px;
  font-weight: bold;
  color: #5c5c5c;
`;

const Icon = styled.img`
  margin-bottom: 8px;
`;

const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.button`
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 18px;

  border: none;
  cursor: pointer;
`;
