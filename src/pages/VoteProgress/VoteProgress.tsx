import React, { useEffect, useState } from 'react';
import './index.css';
import { Button, Checkbox, Divider, Progress, Radio, Space } from 'antd';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useEnv } from '../../App';
import { GetVoteById } from '../../types/api';

const ANSW_MOCK = [
  {
    id: 1,
    text: 'Тилль Линдеманн',
  },
  {
    id: 2,
    text: 'Мэйби Бейби',
  },
  {
    id: 3,
    text: 'Константин Пинчер',
  },
  {
    id: 4,
    text: 'Какой-то мужик',
  },
  {
    id: 5,
    text: 'Какой-то мужик',
  },
];

const ANSWERS_MOCK = [
  {
    id: 1,
    text: 'Какой ваш любимый певец?',
    answers: ['Константин Пинчер', 'Мэйби Бейби'],
  },
  {
    id: 2,
    text: 'Какая у вас любимая музыкальная группа?',
    answers: [],
  },
];

type BottomControlType = {
  onBackClick?: () => void;
  onNextClick?: () => void;
  isShowBack?: boolean;
  isShowNext?: boolean;
  nextText?: string;
  backText?: string;
};

const BottomControl: React.FC<BottomControlType> = ({
  onBackClick,
  onNextClick,
  isShowBack,
  isShowNext,
  nextText,
  backText,
}) => {
  return (
    <div
      style={{
        height: 60,
        backgroundColor: '#FFF',
        borderTop: '1px solid #DADADA',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      {isShowBack && <Button onClick={onBackClick}>{backText}</Button>}
      {isShowNext && (
        <Button
          style={{
            backgroundColor: '#1890FF',
            color: '#FFF',
          }}
          onClick={onNextClick}
        >
          {nextText}
        </Button>
      )}
    </div>
  );
};
BottomControl.defaultProps = {
  backText: 'Перейти назад',
  nextText: 'Перейти далее',
  isShowBack: true,
  isShowNext: true,
};

export const VoteProgress: React.FC = () => {
  const [sendPage, setsendPage] = useState(false);
  const env = useEnv();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedVote, setselectedVote] = useState<GetVoteById | undefined>();
  const [searchParams] = useSearchParams();
  const selectedPage = Number(searchParams.get('selectedPage')) ?? 0;
  const [selectedQuest, setselectedQuest] = useState(selectedPage);
  const [selectedAnswers, setselectedAnswers] = useState([])
  const selectedQuestion = selectedVote?.questions[selectedPage];
  const QUESTIONS_MOCK = selectedVote?.questions.map((x, index) => index);
  
  const handleSetSelectedPage = (selectedPage: number) => {
    setselectedQuest(selectedPage);
    navigate({
      pathname: ``,
      search: createSearchParams({
        selectedPage: selectedPage.toString(),
      }).toString(),
    });
  };

  useEffect(() => {
    env.API.getVote(Number(id))
      .then((res) => {
        setselectedVote(res.data);
      })
      .catch((err) => {
        env.logger.error(err);
      });
  }, [id, selectedPage]);
  if (!selectedQuestion) return <>'undefined question 404'</>;
  return (
    <div
      style={{
        padding: '25px 30px',
        display: 'flex',
        gap: 20,
      }}
    >
      {sendPage ? (
        <div>
          <div
            style={{
              width: 1380,
              minHeight: 840,
              backgroundColor: '#FFF',
            }}
          >
            <div
              style={{
                height: 60,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                borderBottom: '1px solid #DADADA',
                gap: 15,
              }}
            >
              <h3>Результат голосования</h3>
              <p>Пройдено 1/{selectedVote.questions.length}</p>
            </div>
            <div style={{}}>
              {...selectedVote.questions.map((x, index) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      height: 90,
                      padding: '0 14px',
                      borderBottom: '1px solid #DADADA',
                    }}
                  >
                    <h4>{index + 1}</h4>
                    <div>
                      <h4>{x.title}</h4>
                      <p>
                        Ваш ответ:{' '}
                        {x.answers.length
                          ? x.answers
                              .filter((x) => x)
                              .map((x) => x.text)
                              .join(',')
                          : 'Отсутствует'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <BottomControl
            onBackClick={() => setsendPage(false)}
            backText="Вернуться к голосованию"
            nextText="Закончить голосование"
          />
        </div>
      ) : (
        <>
          <div
            style={{
              width: 1040,
            }}
          >
            <div
              style={{
                minHeight: 840,
                backgroundColor: '#FFF',
                padding: '10px 20px',
              }}
            >
              <h3>{selectedQuestion.title}</h3>
              <p
                style={{
                  margin: '20px 0',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '30px',
                }}
              >
                {selectedQuestion.description}
              </p>
              <div
                style={{
                  width: 600,
                  height: 300,
                  marginBottom: 20,
                  backgroundImage:
                    'url(https://bloximages.newyork1.vip.townnews.com/oanow.com/content/tncms/assets/v3/editorial/c/35/c35153f0-456f-11e6-b443-536a5188bfe3/57804b6433fec.image.jpg?resize=1200%2C800)',
                }}
              ></div>
              {selectedQuestion.isMultiply ? (
                <>
                  <Radio.Group onChange={(e) => { selectedAnswers[0] = e.target.value; setselectedAnswers([...selectedAnswers]) }} value={selectedAnswers[0]}>
                    <Space direction="vertical">
                      {selectedQuestion.answers.map((x) => (
                        <Radio value={x.text}>{x.text}</Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                  <Radio.Group />
                </>
              ) : (
                <>
                  <Space direction="vertical">
                    {selectedQuestion.answers.map((x) => (
                      <Checkbox onChange={() => {}}>{x.text}</Checkbox>
                    ))}
                  </Space>
                </>
              )}
            </div>
            <BottomControl
              isShowBack={selectedQuest > 0}
              isShowNext
              onNextClick={() => {
                selectedQuest !== QUESTIONS_MOCK.length - 1
                  ? handleSetSelectedPage(selectedQuest + 1)
                  : setsendPage(true);
              }}
              onBackClick={() => handleSetSelectedPage(selectedQuest - 1)}
              nextText={
                selectedQuest !== QUESTIONS_MOCK.length - 1
                  ? 'Перейти далее'
                  : 'Завершить'
              }
            />
          </div>
          <div
            style={{
              width: 320,
              minHeight: 900,
              backgroundColor: '#FFF',
              padding: '0 20px',
            }}
          >
            <div
              style={{
                padding: '17px 20px',
              }}
            >
              <Progress
                percent={Math.floor(
                  (selectedQuest / QUESTIONS_MOCK.length) * 100
                )}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                borderCollapse: 'collapse',
              }}
            >
              {...QUESTIONS_MOCK.map((x) => {
                return (
                  <div
                    className="pointer"
                    style={{
                      width: 70,
                      height: 70,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border:
                        selectedQuest === x
                          ? '1px solid #1890FF'
                          : '1px solid #DADADA',
                    }}
                    onClick={() => {
                      handleSetSelectedPage(x);
                    }}
                  >
                    <div>{x + 1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
