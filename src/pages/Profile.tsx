import React from 'react';
import { Result, Button, Avatar } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface ProfileProps {
  isOwner: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isOwner }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        icon={<Avatar size={64} icon={<UserOutlined />} />}
        title="John Doe"
        subTitle="Software Engineer"
        extra={
          <>
            {isOwner && (
              <Link to="/edit-profile">
                <Button type="primary">Edit Profile</Button>
              </Link>
            )}
            <div style={{ marginTop: 16 }}>
              <TeamOutlined style={{ marginRight: 8 }} />
              <a href="https://t.me/yourtelegramaccount">Telegram</a>
            </div>
          </>
        }
      />
    </div>
  );
};

export default Profile;
