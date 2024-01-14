import React, { useEffect, useState } from 'react'
import { Button, Input, Tag } from 'antd'
import {
  CheckSquareOutlined,
  EditOutlined,
  FieldTimeOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { ListUser } from './ListUser'
import { ListVote } from './ListVote'
import { useNavigate } from 'react-router-dom'
import { useEnv } from '../../App'
import { GetVote, GetVoteById } from '../../types/api'
import { prettyDate } from '../../api/tools'
import { observer } from 'mobx-react-lite'

const HEADER_HEIGHT = 60

const VotePage: React.FC = () => {
  const [votes, setvotes] = useState<GetVote[]>([])
  const [selectedVote, setselectedVote] = useState<GetVoteById | undefined>()
  const [selectedVoteId, setselectedVoteId] = useState(-1)
  const navigate = useNavigate()
  const env = useEnv()
  const isAlredyVoted =
    selectedVote?.usersVoted?.filter((x) => x.id === env.rootStore.selfUser.id)
      .length !== 0
  const handleSelectedVote = (value: number, index: number) => {
    setselectedVoteId(index)
    env.API.getVote(value)
      .then((res) => {
        setselectedVote(res.data)
      })
      .catch((err) => {
        env.logger.error(err)
        err
      })
  }

  useEffect(() => {
    env.API.getVotes()
      .then((res) => {
        setvotes(res.data.votes)
        handleSelectedVote(res.data.votes[0]?.id, 0)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [])

  return (
    <>
      <div
        style={{
          height: HEADER_HEIGHT,
          display: 'flex',
          flexDirection: 'row',
          padding: '5px 10px',
          gap: '15px',
          alignItems: 'center',
          borderBottom: '0.5px solid #DADADA',
          background: '#FFF',
        }}
      >
        <h1>Голосования</h1>
        <h2
          style={{
            color: '#C6C6C6',
          }}
        >
          {votes.length}
        </h2>
        <Button
          style={{
            backgroundColor: '#1890FF',
            color: '#FFF',
            width: 177,
            height: 32,
          }}
          onClick={() => {
            navigate('/voteCreate')
          }}
        >
          Добавить голосование
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            background: '#FFF',
            //boxShadow: '0px 6px 25px 5px rgba(0, 0, 0, 0.10)',
            minHeight: 'calc(100vh - 124px)',
          }}
        >
          <Input.Search
            placeholder='Enter a keyword'
            onSearch={() => {}}
            style={{
              width: 400,
              padding: '20px 15px',
              borderBottom: '1px solid #DADADA',
            }}
          />
          <div
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: 'calc(100vh - 124px - 73px)',
            }}
          >
            {votes.map((x, index) => {
              return (
                <div
                  onClick={() => {
                    handleSelectedVote(x.id, index)
                  }}
                >
                  <ListVote
                    key={x.id}
                    isSelected={index === selectedVoteId}
                    name={x.title}
                    id={x.id}
                    date={`${prettyDate(x.dateOfStart)}-${prettyDate(
                      x.dateOfEnd,
                    )}`}
                    description={x.description}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {selectedVote ? (
          <div
            style={{
              padding: '15px',
              width: '100%',
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
              <div className='flex gap-4 '>
                <h3>{selectedVote.title}</h3>
                {selectedVote.isAnonymous && (
                  <Tag className='h-5' color='blue'>
                    Анонимное голосование
                  </Tag>
                )}
              </div>
              {selectedVote.user.id === env.rootStore.selfUser.id && (
                <Button onClick={() => {}}>
                  <EditOutlined />
                  Редактировать
                </Button>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                backgroundColor: '#FFF',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: '#F3F6F9',
                  flexBasis: '66%',
                }}
              >
                <div
                  style={{
                    padding: '30px 20px',
                    borderRight: '1px solid #DADADA',
                    flexBasis: '50%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div>
                      <h4>Организатор</h4>
                      <p className='gray'>{selectedVote.user.fullName}</p>
                    </div>
                    <UserOutlined
                      style={{ marginLeft: 'auto', fontSize: '150%' }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    padding: '30px 20px',
                    flexBasis: '50%',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <div>
                      <h4>Сроки проведения</h4>
                      <p className='gray'>{`${prettyDate(
                        selectedVote.dateOfStart,
                      )} - ${prettyDate(selectedVote.dateOfEnd)}`}</p>
                    </div>
                    <FieldTimeOutlined
                      style={{ marginLeft: 'auto', fontSize: '150%' }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: '30px 0 30px 20px',
                  backgroundColor: '#F3F6F9',
                  flexBasis: '34%',
                  borderLeft: '1px solid #DADADA',
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <h4>Кол-во вопросов</h4>
                    <p className='gray'>{selectedVote.questions.length}</p>
                  </div>
                  <CheckSquareOutlined
                    style={{
                      marginLeft: 'auto',
                      fontSize: '150%',
                      marginRight: 20,
                    }}
                  />
                </div>
              </div>
            </div>
            {selectedVote.isAnonymous ? (
              <div
                style={{
                  backgroundColor: '#FFF',
                }}
              >
                <div
                  style={{
                    height: 60,
                    padding: 20,
                    borderBottom: '1px solid #DADADA',
                  }}
                >
                  <h3>Описание</h3>
                </div>
                <div
                  style={{
                    height: 550,
                    overflowY: 'auto',
                    padding: 20,
                  }}
                >
                  {selectedVote.description}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: '#FFF',
                }}
              >
                <div //1column
                  style={{
                    minHeight: 480,
                    maxHeight: 700,
                    backgroundColor: '#FFF',
                    flexBasis: '66%',
                  }}
                >
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
                      <p className='gray'>
                        {selectedVote.usersVoted?.length ?? 0}
                      </p>
                    </div>
                  </div>
                  <div
                    className='usersContainer'
                    style={{
                      backgroundColor: '#FFF',
                    }}
                  >
                    <div
                      style={{
                        overflowY: 'auto',
                        height: 450,
                      }}
                    >
                      {selectedVote.usersVoted.map((x, index) => {
                        return (
                          <ListUser
                            key={index}
                            mail={''}
                            name={x.fullName}
                            onDeleteClick={() => {}}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div //2column
                  style={{
                    flexBasis: '34%',
                    minHeight: 400,
                    maxHeight: 700,
                    backgroundColor: '#FFF',
                    borderLeft: '1px solid #DADADA',
                    overflowY: 'hidden',
                    overflowX: 'hidden',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#fff',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: 60,
                        padding: '20px',
                        borderBottom: '1px solid #DADADA',
                        display: 'flex',
                      }}
                    >
                      <h3>Описание</h3>
                      <MenuFoldOutlined
                        style={{ marginLeft: 'auto', fontSize: '150%' }}
                      />
                    </div>
                    <div
                      style={{
                        padding: 20,
                      }}
                    >
                      {selectedVote.description}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              className='bg-white py-3 px-5'
              style={{
                borderTop: '0.5px solid #DADADA',
              }}
            >
              {!isAlredyVoted ? (
                <Button
                  className='w-200'
                  type='primary'
                  onClick={() => navigate(`/vote-progress/${selectedVote.id}`)}
                >
                  Перейти к голосованию
                </Button>
              ) : (
                <div className='flex gap-3'>
                  <Button
                    onClick={() => navigate(`/vote/${selectedVote.id}/results`)}
                  >
                    Посмотреть общую статистику
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default observer(VotePage)
