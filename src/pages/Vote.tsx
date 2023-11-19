
import React, { useState } from 'react';
import { Form, Radio, Button, message, Modal, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Voter {
  name: string;
  vote: string;
}

const VotePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [voters, setVoters] = useState<Voter[]>([
    { name: 'User1', vote: '' },
    { name: 'User2', vote: '' },
    { name: 'User3', vote: '' }
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleVoteSubmit = (values: any) => {
    setLoading(true);

    // Simulating an API call
    setTimeout(() => {
      setLoading(false);
      setVoters((prevVoters) => [
        ...prevVoters,
        {
          name: `User${prevVoters.length + 1}`,
          vote: values.choice
        }
      ]);
      message.success(`You voted for ${values.choice}`);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form layout="vertical" style={{ width: 300 }} onFinish={handleVoteSubmit}>
        <h1>Title of the Vote</h1>
        <p>Description of the Vote</p>
        <Form.Item name="choice" label="Choose an option">
          <Radio.Group>
            <Radio value="Option 1">Option 1</Radio>
            <Radio value="Option 2">Option 2</Radio>
            <Radio value="Option 3">Option 3</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Vote
          </Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 20 }}>
        <h2>Voters:</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {voters.slice(0, 3).map((voter, index) => (
            <div key={index} style={{ marginRight: 8 }}>
              <Avatar icon={<UserOutlined />} onClick={() => setModalVisible(true)} />
            </div>
          ))}
          {voters.length > 3 && (
            <div>
              <Avatar
                style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
                onClick={() => setModalVisible(true)}
              >
                +{voters.length - 3}
              </Avatar>
            </div>
          )}
        </div>
      </div>

      <Modal visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        {/* Content of the modal window */}
        <h3>List of Voters:</h3>
        {voters.map((voter, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <Avatar icon={<UserOutlined />} />
            <p style={{ marginLeft: 8 }}>{voter.name}</p>
            {voter.vote && <p style={{ marginLeft: 8 }}>Voted for: {voter.vote}</p>}
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default VotePage;
