import { MoreOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Pagination } from 'antd';
import React, { useState } from 'react';

const USER_MAIL_MOCK = [
  {
    avatar: '',
    username: 'Vad Ser',
    mail: 'chuvak@mail.ru',
    messageDescription: 'О встрече.',
    messageShort:
      'Здравствуйте, хотел бы уточнить о завтрашней встрече в 18:00. В каком кабинете встречаемся и что необходим...',
    messageTime: '20:44',
    isReaded: true,
  },
  {
    avatar: '',
    username: 'Vad Ser',
    mail: 'chuvak@mail.ru',
    messageDescription: 'О встрече.',
    messageShort:
      'Здравствуйте, хотел бы уточнить о завтрашней встрече в 18:00. В каком кабинете встречаемся и что необходим...',
    messageTime: '20:44',
    isReaded: false,
  },
  {
    avatar: '',
    username: 'Vad Ser',
    mail: 'chuvak@mail.ru',
    messageDescription: 'О встрече.',
    messageShort:
      'Здравствуйте, хотел бы уточнить о завтрашней встрече в 18:00. В каком кабинете встречаемся и что необходим...',
    messageTime: '20:44',
    isReaded: false,
  },
];

const SendMessageModal = () => {};

export const Mail: React.FC = () => {
  const [isShowModal, setisShowModal] = useState(false);
  const sendMessage = () => {
    //TODO

    setisShowModal(false)
  };

  return (
    <div>
      <Modal
        onCancel={() => setisShowModal(false)}
        onOk={sendMessage}
        open={isShowModal}
        centered
        title="Новое письмо"
        width={'80vw'}
        cancelText="Отмена"
        okText="Отправить"
        footer={[]}
      >
        <div
          className="mail-modal"
          style={{
            backgroundColor: '#FFF',
            height: 900,
            borderTop: '1px solid #DADADA',
          }}
        >
          <div
            style={{
              height: 900 - 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 10,
                height: 50,
            borderBottom: '1px solid #DADADA',
            alignItems: 'center',
          }}
            >
              <p>Тема: </p>
              <Input bordered={false} />
            </div>
            <div
              style={{
                display: 'flex',
                gap: 10,
                height: 50,
            borderBottom: '1px solid #DADADA',
            alignItems: 'center',
            marginBottom: 30,
          }}
            >
              <p>Получатель: </p>
              <Input bordered={false} />
            </div>

            <Input.TextArea style={{resize: 'none'}} placeholder='Введите текст...' rows={32} ></Input.TextArea>

          </div>
          <div
            style={{
              height: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              paddingTop: 20,
            borderTop: '1px solid #DADADA',
            }}
          >
            <Button onClick={sendMessage} type='primary'>Отправить</Button>
            <PaperClipOutlined className='pointer' style={{fontSize: "150%"}} />
          </div>
        </div>
      </Modal>

      <div
        className="mail-header"
        style={{
          padding: '30px 30px 20px 30px',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
        }}
      >
        <Button
          onClick={() => {
            setisShowModal(true);
          }}
          style={{
            marginRight: 20,
          }}
          type="primary"
        >
          Написать письмо
        </Button>
        <Button>Входящие</Button>
        <Button>Отправленные</Button>
      </div>
      <div
        className="mail-container"
        style={{
          margin: '0 30px',
          borderRadius: '15px 15px 0 0',
          height: 700,
          backgroundColor: '#FFF',
          overflowY: 'scroll',
        }}
      >
        {...USER_MAIL_MOCK.map((x) => {
          return (
            <div
              className="pointer"
              style={{
                height: 80,
                background: x.isReaded ? '#FFF' : 'rgba(24, 144, 255, 0.05)',
                display: 'flex',
                padding: '0 30px 0 50px',
                alignItems: 'center',
                borderBottom: '1px solid #DADADA',
              }}
            >
              <img src={x.avatar} alt="user avatat" height={30} width={30} />
              <div
                style={{
                  margin: '0 10px',
                  width: 180,
                }}
              >
                <h4>{x.username}</h4>
                <p style={{ color: '#949494' }}>{x.mail}</p>
              </div>
              <div
                style={{
                  width: 110,
                  marginRight: 35,
                }}
              >
                <h4>{x.messageDescription}</h4>
              </div>
              <div
                style={{
                  marginRight: 100,
                }}
              >
                <p>{x.messageShort}</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 15 }}>
                <p>{x.messageTime}</p>
                <MoreOutlined style={{ fontSize: '150%' }} />
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="mail-footer"
        style={{
          height: 50,
          backgroundColor: '#FFF',
          borderTop: '1px solid #DADADA',
          margin: '0 30px',
          borderRadius: '0 0 15px 15px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};
