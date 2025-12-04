import React from 'react';
import styled from 'styled-components';
import defaultImage from '../../../assets/images/default_profileImage.png';

export interface Friend {
  id: number;
  name: string;
  profileImage?: string;
}

interface FriendListProps {
  friends: Friend[];
}

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  return (
    <FriendsListContainer>
      {friends.map((friend) => (
        <FriendItem key={friend.id}>
          <ProfileAvatar>
            <img src={friend.profileImage || defaultImage} alt={`${friend.name} 프로필`} />
          </ProfileAvatar>
          <ProfileName>{friend.name}</ProfileName>
        </FriendItem>
      ))}
    </FriendsListContainer>
  );
};

export default FriendList;

const FriendsListContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    display: none; 
  }
`;

const FriendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  gap: 8px;
`;

const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e0e0e0;
  overflow: hidden;
  
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.span`
  font-size: 14px; 
  color: #333;
`;