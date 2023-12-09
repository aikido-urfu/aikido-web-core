import React, { useState } from 'react';
import './index.css';
import { Button, Checkbox, Divider, Progress, Radio } from 'antd';
import { rootStore } from '../../models/voteCreate';
import { useNavigate } from 'react-router-dom';

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

const QUESTIONS_MOCK = [1, 2, 3, 4, 5, 6];

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
  nextText?: string
  backText?: string
};

const BottomControl: React.FC<BottomControlType> = ({
  onBackClick,
  onNextClick,
  isShowBack,
  isShowNext,
  nextText,
  backText
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
      }}
    >
      {isShowBack && <Button onClick={onBackClick}>{backText}</Button>}
      {isShowNext && (
        <Button
          style={{
            backgroundColor: '#1890FF',
            margin: '10px 20px',
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
  nextText: 'Перейти далее'
}


export const VoteProgress: React.FC = () => {
  const isAnonim = false;
  const [selectedQuest, setselectedQuest] = useState(1);
  const [sendPage, setsendPage] = useState(false);
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
            <p>Пройдено 1/{QUESTIONS_MOCK.length}</p>
          </div>
          <div
            style={{
            }}
          >
            {...ANSWERS_MOCK.map((x) => {
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
                  <h4>{x.id}</h4>
                  <div>
                    <h4>{x.text}</h4>
                    <p>
                      Ваш ответ:{' '}
                      {x.answers.length ? x.answers.join(',') : 'Отсутствует'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <BottomControl onBackClick={() => setsendPage(false)} isShowBack isShowNext backText='Вернуться к голосованию' nextText='Закончить голосование' />
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
              <h3>Какой ваш любимый певец?</h3>
              <p
                style={{
                  margin: '20px 0',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '30px',
                }}
              >
                И нет сомнений, что сторонники тоталитаризма в науке
                представлены в исключительно положительном свете. Задача
                организации, в особенности же постоянный количественный рост и
                сфера нашей активности однозначно фиксирует необходимость
                позиций, занимаемых участниками в отношении поставленных задач.{' '}
              </p>
              <div
                style={{
                  width: 600,
                  height: 300,
                  marginBottom: 20,
                  backgroundImage: 'url(https://bloximages.newyork1.vip.townnews.com/oanow.com/content/tncms/assets/v3/editorial/c/35/c35153f0-456f-11e6-b443-536a5188bfe3/57804b6433fec.image.jpg?resize=1200%2C800)'
                }}
              ></div>
              {...ANSW_MOCK.map((x) => {
                return (
                  <div
                    style={{
                      margin: '15px 0',
                    }}
                  >
                    {isAnonim ? (
                      <Radio>{x.text}</Radio>
                    ) : (
                      <Checkbox onChange={() => {}}>{x.text}</Checkbox>
                    )}
                  </div>
                );
              })}
            </div>
            <BottomControl
              isShowBack={selectedQuest > 1}
              isShowNext
              onNextClick={() => {
                selectedQuest !== QUESTIONS_MOCK.length
                  ? setselectedQuest(selectedQuest + 1)
                  : setsendPage(true);
              }}
              onBackClick={() => setselectedQuest(selectedQuest - 1)}
              nextText={selectedQuest !== QUESTIONS_MOCK.length ? 'Перейти далее' : 'Завершить'}
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
              <Progress percent={30} />
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
                      setselectedQuest(x);
                    }}
                  >
                    <div>{x}</div>
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
