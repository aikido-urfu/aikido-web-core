import {
  ArrowLeftOutlined,
  FileTextOutlined,
  MoreOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Pagination, Radio, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
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

type ReadMessageModalType = {
  isOpen: boolean,
  close: () => void
}

const ReadMessageModal: React.FC<ReadMessageModalType> = ({isOpen, close}) => {
  return (
    <Modal onCancel={close} open={isOpen} centered width={'80vw'} footer={[]}>
      <div
      className="mail-modal"
      style={{
        backgroundColor: '#FFF',
        height: 900,
      }}>
        <div
          style={{
            height: 900 - 80
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 25,
              padding: '0 25px 0 0',
              marginBottom: 25,
            }}
          >
            <ArrowLeftOutlined onClick={close} style={{ fontSize: '150%', marginRight: 20 }} />
            <PaperClipOutlined style={{ fontSize: '150%' }} />
            <MoreOutlined style={{ fontSize: '150%' }} />
            <Pagination
              style={{ marginLeft: 'auto' }}
              simple
              defaultCurrent={1}
              total={50}
            />
          </div>
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 30,
            }}
          >
            <h4>О встрече.</h4>
            <Tag style={{ borderRadius: 10 }}>От 21.12.2023</Tag>
          </div>
          <div
            className="mail-user"
            style={{
              display: 'flex',
              gap: 10,
              width: 600,
            }}
          >
            <img src="" alt="avatar" width={30} height={30} />
            <div>
              <p>Cергей Киреев | sergey_kireev@mail.ru</p>
              <p>кому: мне</p>
            </div>
            <p style={{ marginLeft: 'auto' }}>21.12.2023 19:23</p>
          </div>
          <div
            className="mail-message"
            style={{
              width: 600,
              marginTop: 15,
              backgroundColor: '#E6F7FF',
              borderRadius: 15,
              padding: 15,
            }}
          >
            <p>
              Здравствуйте. Необходимо выдать логин и пароль новому сотруднику.
              ФИО: Кошкина Любовь Сергеевна.
            </p>
            <Tag
              className="pointer"
              style={{
                borderRadius: 10,
                marginTop: 25,
                padding: '2px 10px',
              }}
            >
              <FileTextOutlined style={{ marginRight: 5 }} />
              Отсканированное соглашение.pdf
            </Tag>
          </div>
        </div>

        <div style={{
          height: 80,
          display: 'flex',
          gap: 20,
          alignItems: 'end',
          borderTop: '1px solid #DADADA',
        }}>
          <TextArea rows={1} />
          <p className='pointer' style={{color: '#1890FF'}}>Прикрепить</p>
          <Button type='primary' >Отправить</Button>
        </div>
      </div>
    </Modal>
  );
};

export const Mail: React.FC = () => {
  const [isShowModal, setisShowModal] = useState(false);
  const [isShowMessage, setisShowMessage] = useState(false);

  const [sendSelected, setsendSelected] = useState(false)

  const sendMessage = () => {
    //TODO
    setisShowModal(false);
  };

  return (
    <div>
      <ReadMessageModal close={() => setisShowMessage(false)} isOpen={isShowMessage} />
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

            <Input.TextArea
              style={{ resize: 'none' }}
              placeholder="Введите текст..."
              rows={32}
            ></Input.TextArea>
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
            <Button onClick={sendMessage} type="primary">
              Отправить
            </Button>
            <PaperClipOutlined
              className="pointer"
              style={{ fontSize: '150%' }}
            />
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
        <Radio.Group defaultValue="Входящие">
          <Radio.Button value="Входящие">Входящие</Radio.Button>
          <Radio.Button value="Отправленные">Отправленные          БКфвшщюИгеещт value=@Jnghfdktyyst@§Jnghfdktyyst±/Radio&Button§
</Radio.Button>
        </Radio.Group>
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
            onClick={() => {setisShowMessage(true)}}
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
