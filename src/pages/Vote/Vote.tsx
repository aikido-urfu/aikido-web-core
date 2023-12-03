import React, { useState } from 'react';
import {
  Form,
  Radio,
  Button,
  message,
  Modal,
  Avatar,
  Input,
  Divider,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ListUser } from './ListUser';
import { ListVote } from './ListVote';

interface Voter {
  name: string;
  vote: string;
}

const DESP_MOCK = `Какое-то описание, хз что тут писать, напишу о рыбном тексте. Современные технологии достигли такого уровня, что синтетическое тестирование играет важную роль в формировании экспериментов, поражающих по своей масштабности и грандиозности. Значимость этих проблем настолько очевидна, что базовый вектор развития позволяет оценить значение дальнейших направлений развития. Принимая во внимание показатели успешности, выбранный нами инновационный путь требует от нас анализа системы массового участия.`;

const USERS_MOCK = [
  {
    name: 'Сергеев Владислав Аркадьевич',
    mail: 'v.sergeev@mail.ru',
  },
  {
    name: 'Евсеева Алиса Александровна',
    mail: 'v.sergeev@mail.ru',
  },
  {
    name: 'Шолов Евгений Дмитреевич',
    mail: 'v.sergeev@mail.ru',
  },
  {
    name: 'Шолов Евгений Дмитреевич',
    mail: 'v.sergeev@mail.ru',
  },
  {
    name: 'Шолов Евгений Дмитреевич',
    mail: 'v.sergeev@mail.ru',
  },
  {
    name: 'Шолов Евгений Дмитреевич',
    mail: 'v.sergeev@mail.ru',
  },
  {
    name: 'Шолов Евгений Дмитреевич',
    mail: 'v.sergeev@mail.ru',
  },
]

const VOTES_MOCK = [
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 1,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 2,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 3,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 4,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 5,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 6,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 7,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 8,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
  {
    name: "dgsgsd",
    date: '24.11 19:00 - 25.11 19:00',
    id: 9,
    description: 'Какое-то описание,  что тут писать, напишу о то...'
  },
]

const VotePage: React.FC = () => {

  const [selectedVoteId, setselectedVoteId] = useState(1)

  return (
    <>
      <div
        style={{
          height: '60px',
          display: 'flex',
          flexDirection: 'row',
          padding: '5px 10px',
          gap: '15px',
          alignItems: 'center',
          borderBottom: '0.5px solid #FFF',
          background: '#FFF',
        }}
      >
        <h1>Голосования</h1>
        <h2
          style={{
            color: '#C6C6C6',
          }}
        >
          4
        </h2>
        <Button
          style={{
            backgroundColor: '#1890FF',
            color: '#FFF',
            width: 177,
            height: 32,
          }}
        >
          Добавить голосование
        </Button>
      </div>
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            background: '#FFF',
            boxShadow: '0px 6px 25px 5px rgba(0, 0, 0, 0.10)',
            maxHeight: '80vh',
            overflowY: 'scroll',
          }}
        >
          <Input.Search
            placeholder="Enter a keyword"
            onSearch={() => {}}
            style={{
              width: 400,
              padding: '20px 15px',
              borderBottom: '1px solid #DADADA',
            }}
          />
          {VOTES_MOCK.map((x) => {
            return (
              <div onClick={() => {setselectedVoteId(x.id)}}>
                <ListVote isSelected={x.id === selectedVoteId} name={x.name} id={x.id} date={x.date} description={x.description} />
              </div>)
          })}
        </div>
        <div
          style={{
            padding: '15px',
            width: '1010px',
            height: '800px',
            filter: 'drop-shadow(0px 3px 25px rgba(0, 0, 0, 0.10))',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#FFF',
              height: '60px',
              padding: '15px',
            }}
          >
            <h3>Голосование № 3</h3>
            <Button>Редактировать</Button>
          </div>

          <div
            className="container"
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div //1column
              style={{
                width: 702,
                minHeight: 620,
                maxHeight: 700,
                backgroundColor: '#FFF',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: '#F3F6F9',
                }}
              >
                <div
                  style={{
                    padding: '30px 20px',
                    width: 323,
                    borderRight: '1px solid #DADADA',
                  }}
                >
                  <h4>Организатор</h4>
                  <p>Маликова Анастасия</p>
                </div>
                <div
                  style={{
                    padding: '30px 20px',
                    width: 323,
                  }}
                >
                  <h4>Время проведения</h4>
                  <p>24.11.2023 19:00 - 25.11.2023 19:00</p>
                </div>
              </div>

              {/* {here} */}
              <div
                style={{
                  backgroundColor: '#FFF',
                  height: 60,
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #DADADA',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <h3>Участники</h3>
                  <p>22</p>
                </div>
              </div>
              <div
                className="usersContainer"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFF',
                }}
              >
                <div
                  style={{
                    overflowY: 'scroll',
                    height: 450,
                  }}
                >
                  {USERS_MOCK.map((x) => {
                    return <ListUser mail={x.mail} name={x.name} />
                  })}
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Button
                
                style={{
                  margin: '20px 40px',
                  backgroundColor: '#1890FF',
                  color: '#FFF',
                  height: 32,
                  width: 200,
                  position: 'relative',
                  bottom: 0,
                }}>Перейти к голосованию</Button>
              </div>
            </div>

            <div //2column
              style={{
                width: 278,
                minHeight: 620,
                maxHeight: 700,
                backgroundColor: '#FFF',
                borderLeft: '1px solid #DADADA',
                overflowY: 'hidden',
                overflowX: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '30px 0 30px 20px',
                  backgroundColor: '#F3F6F9',
                }}
              >
                <h4>Кол-во вопросов</h4>
                <p>90</p>
              </div>
              <div
                style={{
                  padding: '0 20px 0 0',
                  backgroundColor: '#fff',
                }}
              >
                <div
                  style={{
                    width: 278,
                    height: 60,
                    padding: '20px',
                    borderBottom: '1px solid #DADADA',
                  }}
                >
                  <h3>Описание</h3>
                </div>
                <div
                  style={{
                    padding: 20,
                  }}
                >
                  {DESP_MOCK}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotePage;
