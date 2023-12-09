import { Button, Input, Modal, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { USERS_MOCK } from '../Vote/Vote';
import { ListUser } from '../Vote/ListUser';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  FileJpgOutlined,
} from '@ant-design/icons';

type QuestionType = {
  id: number;
};

const Question: React.FC<QuestionType> = ({ id }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: 80,
        backgroundColor: '#FFF',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #DADADA',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
        }}
      >
        <ArrowUpOutlined />
        <ArrowDownOutlined />
        {id}
        <div>
          <h4>Вопрос</h4>
          <p>описание</p>
        </div>
      </div>
      <DeleteOutlined />
    </div>
  );
};

type ModalAddQuestionType = {
  isShowModal: boolean
  setshowModal: (val: boolean) => void
}

const ModalAddQuestion: React.FC<ModalAddQuestionType> = ({isShowModal, setshowModal}) => {
  return <Modal
        title=""
        width={1200}
        cancelText="Отмена"
        open={isShowModal}
        onOk={() => {}}
        onCancel={() => {
          setshowModal(false);
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-between',
          }}
        >
          <div
            style={{
              width: 800,
            }}
            //создание вопроса
          >
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #DADADA',
              }}
            >
              <h3>Создание вопроса</h3>
            </div>
            <p color="gray">Название вопроса</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 15,
              }}
            >
              <Input />
              <p>Мультивыбор</p>
              <Switch />
            </div>
            <p>Описание</p>
            <TextArea rows={12} />

            {...[1, 2, 3].map((x) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 15,
                    margin: '15px 0',
                  }}
                >
                  <p>{x}</p>
                  <Input placeholder="вариант ответа" />
                </div>
              );
            })}
            <div
              style={{
                color: '#1890FF',
              }}
            >
              <h4>Добавить вопрос +</h4>
            </div>
          </div>
          <div
            //документы
            style={{
              width: 400,
              padding: '0 20px',
            }}
          >
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #DADADA',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0 20px 0 0',
              }}
            >
              <h3>Документы</h3>
              <Button>Загрузить</Button>
            </div>
            {...[1, 2].map((x) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 'auto',
                    height: 65,
                    borderBottom: '1px solid #DADADA',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileJpgOutlined />
                    <h4>SomeRandomPic.jpg</h4>
                  </div>
                  <DeleteOutlined />
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
}
type SecondStepType = {
  onStepChange?: (step: number) => void
}

export const SecondStep: React.FC<SecondStepType> = ({onStepChange}) => {
  const [isShowModal, setshowModal] = useState(false);
  const showModal = () => {
    setshowModal(true);
  };

  return (
    <div
      style={{
        maxHeight: '800px',
      }}
    >
      <div
        style={{
          height: 60,
          display: 'flex',
          alignItems: 'center',
          color: '#1890FF',
          borderBottom: '1px solid #DADADA',
          borderTop: '1px solid #DADADA',
          padding: '0 20px',
        }}
      >
        <div onClick={showModal}>
          <h3>Добавить вопрос +</h3>
        </div>
      </div>
      {...[1, 2, 3].map((x) => {
        return <Question id={x} />;
      })}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button
          style={{
            margin: '20px 10px 20px 20px',
            backgroundColor: '#1890FF',
            color: '#FFF',
          }}
        >
          Создать
        </Button>
        <Button
          style={{
            margin: '20px 10px 20px 20px',
          }}
          onClick={() => onStepChange(0)}
        >
          Назад
        </Button>
      </div>
      <ModalAddQuestion isShowModal={isShowModal} setshowModal={setshowModal} />
    </div>
  );
};
