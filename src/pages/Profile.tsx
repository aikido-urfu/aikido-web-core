import React from 'react';
import { Result, Button, Avatar } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEnv } from '../App';
import { observer } from 'mobx-react-lite';

interface ProfileProps {
  isOwner: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isOwner }) => {

  const env = useEnv()
  const user = env.rootStore.selfUser

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Result
        icon={<Avatar size={64} icon={<UserOutlined />} />}
        title={user.fullName}
        subTitle={user.email}
        extra={
          <>
            {isOwner && (
              <Link to="/edit-profile">
                <Button type="primary">Edit Profile</Button>
              </Link>
            )}
            <div style={{ marginTop: 16 }}>
              <TeamOutlined style={{ marginRight: 8 }} />
              <a href={user.telegram || ''}>Telegram</a>
            </div>
          </>
        }
      />
    </div>
  );
};

export default observer(Profile);
