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
  UploadOutlined,
} from '@ant-design/icons';
import { PostVote, Question } from '../../types/api';
import { useEnv } from '../../App';

type QuestionType = {
  data: Question;
  id: number;
};

const QuestionBlock: React.FC<QuestionType> = ({ data, id }) => {
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
        {id > 0 && <ArrowUpOutlined style={{ fontSize: '150%' }} />}
        <ArrowDownOutlined style={{ fontSize: '150%' }} />
        {id}
        <div>
          <h4>{data.title}</h4>
          <p>{data.description}</p>
        </div>
      </div>
      <DeleteOutlined style={{ fontSize: '150%' }} />
    </div>
  );
};

type ModalAddQuestionType = {
  isShowModal: boolean;
  setshowModal: (val: boolean) => void;
  onAddClick: (q: Question) => void;
};

const ModalAddQuestion: React.FC<ModalAddQuestionType> = ({
  isShowModal,
  setshowModal,
  onAddClick,
}) => {
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [questions, setquestions] = useState<string[]>(['', '']);
  const [isMultiply, setisMultiply] = useState(false)
  const handleAddClick = () => {
    onAddClick({
      title: name,
      description,
      files: [],
      photos: [],
      isMultiply,
      answers: questions,
    });
    setshowModal(false);
  };

  const handleDeleteAnswer = (index: number) => {
    const copy = [...questions];
    copy.splice(index, 1);
    setquestions([...copy]);
  };

  return (
    <Modal
      footer={[]}
      title=""
      width={1200}
      cancelText="Отмена"
      open={isShowModal}
      onOk={() => {
        handleAddClick();
      }}
      onCancel={() => {
        setshowModal(false);
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-between',
            minHeight: 800
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
              <Input onChange={(e) => setname(e.target.value)} />
              <p>Мультивыбор</p>
              <Switch checked={isMultiply} onChange={val => setisMultiply(val)} />
            </div>
            <p>Описание</p>
            <TextArea
              rows={12}
              onChange={(e) => setdescription(e.target.value)}
            />

            {...questions.map((x, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 15,
                    margin: '15px 0',
                  }}
                >
                  <p>{index}</p>
                  <Input
                    placeholder="вариант ответа"
                    value={x}
                    onChange={(e) => {
                      questions[index] = e.target.value;
                      setquestions([...questions]);
                    }}
                  />
                  {index > 1 && (
                    <DeleteOutlined
                      onClick={() => handleDeleteAnswer(index)}
                      style={{ margin: '0 10px', fontSize: '125%' }}
                    />
                  )}
                </div>
              );
            })}
            <div
              className="pointer"
              style={{
                color: '#1890FF',
              }}
              onClick={() => {
                questions.push('');
                setquestions([...questions]);
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
              <Button>
              <UploadOutlined />
              Загрузить</Button>
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
                  <DeleteOutlined style={{fontSize: '150%'}} />
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 15,
            borderTop: '1px solid #DADADA',
            paddingTop: 20,
            margin: '20px 0 0 0'
          }}
        >
          <Button onClick={handleAddClick} type="primary">Сохранить</Button>
          <Button onClick={() => setshowModal(false)}>Отмена</Button>
        </div>
      </div>
    </Modal>
  );
};
type SecondStepType = {
  onStepChange?: (step: number) => void;
  onFInallizeVote: (data: PostVote) => void;
};

export const SecondStep: React.FC<SecondStepType> = ({
  onStepChange,
  onFInallizeVote,
}) => {
  const [isShowModal, setshowModal] = useState(false);
  const {rootStore} = useEnv()
  const voteCreateModel = rootStore.VoteCreate;

  const showModal = () => {
    setshowModal(true);
  };

  const onQuestionAdd = (data: Question) => {
    voteCreateModel.addQuestion(data);
  };

  const handleSendClick = () => {
    const res: PostVote = {
      title: voteCreateModel.title,
      description: voteCreateModel.description,
      dateOfStart: voteCreateModel.dateOfStart,
      dateOfEnd: voteCreateModel.dateOfEnd,
      isAnonymous: !!voteCreateModel.isAnonim,
      isActive: true,
      isHidenCounter: false,
      privateUsers: [],
      files: [],
      photos: [],
      questions: voteCreateModel.questions,
    };
    onFInallizeVote(res);
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
        <div className="pointer" onClick={showModal}>
          <p>Добавить вопрос +</p>
        </div>
      </div>
      {...voteCreateModel.questions.map((x, index) => {
        return <QuestionBlock id={index} data={x} />;
      })}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button
          onClick={handleSendClick}
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
      <ModalAddQuestion
        onAddClick={onQuestionAdd}
        isShowModal={isShowModal}
        setshowModal={setshowModal}
      />
    </div>
  );
};
