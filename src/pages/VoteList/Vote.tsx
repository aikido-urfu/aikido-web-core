import React, { useEffect, useState } from 'react'
import { Button, Input, Tag, Tooltip, Drawer, theme } from 'antd'
import {
  CheckSquareOutlined,
  EditOutlined,
  FieldTimeOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PlusOutlined,
  FilterOutlined,
} from '@ant-design/icons'

import { ListUser, ListVote, VoteFiles } from '../../pages'

import { useNavigate, useParams } from 'react-router-dom'
import { useEnv } from '../../App'
import { GetVote, GetVoteById } from '../../types/api'
import { prettyDate } from '../../api/tools'
import { observer } from 'mobx-react-lite'

import { getCookie } from '../helpers/cookie.helper'
import { COOKIE } from '../../api/axios'

import { maxString } from '../../api/tools'

const HEADER_HEIGHT = 60

const VotePage: React.FC = () => {
  // const isMobile
  const [votes, setvotes] = useState<GetVote[]>([])
  const [dataSource, setDataSource] = useState<GetVote[]>([])
  const [selectedVote, setselectedVote] = useState<GetVoteById | undefined>()
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const env = useEnv()
  const { id } = useParams()
  const url_id = id || ''
  // const [selectedVoteId, setselectedVoteId] = useState(+url_id)
  // const { token } = theme.useToken()
  // const [open, setOpen] = useState(false)

  useEffect(() => {
    if (getCookie('user') !== COOKIE) {
      navigate(0)
    }
  })

  const isAlredyVoted =
    selectedVote?.usersVoted?.filter((x) => x.id === env.rootStore.selfUser.id)
      .length !== 0
  const handleSelectedVote = (value: number) => {
    env.API.getVote(value)
      .then((res) => {
        navigate(`/vote/${value}`)
        setselectedVote(res.data)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }

  useEffect(() => {
    env.API.getVotes()
      .then((res) => {
        setvotes(res.data.votes)
        res.data.votes.map((value) => {
          if (url_id === String(value.id)) {
            navigate(`/vote/${url_id}`)
            handleSelectedVote(+url_id)
          }
        })
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [])

  // const showDrawer = () => {
  //   setOpen(true)
  // }

  // const onClose = () => {
  //   setOpen(false)
  // }

  const handleSearch = (e: any) => {
    const currValue = e.target.value.toLowerCase()
    setValue(currValue)

    const filteredData = votes.filter((entry: any) =>
      entry.title.toLowerCase().includes(currValue),
    )
    setDataSource(filteredData)
  }

  const showMembers = () => {
    let sum = selectedVote?.respondents.length || 0
    selectedVote?.attachedGroups.forEach((value, index, array) => {
      sum += value.users.length
    })
    return sum
  }

  return (
    <>
      <div
        style={{
          height: HEADER_HEIGHT,
          display: 'flex',
          flexDirection: 'row',
          padding: '5px 0px 5px 30px',
          alignItems: 'center',
          borderBottom: '0.5px solid #DADADA',
          background: '#FFF',
        }}
      >
        <h1 className='title' style={{ marginRight: '10px' }}>
          Голосования
        </h1>
        <h2
          className='title'
          style={{
            color: '#C6C6C6',
            marginRight: '20px',
          }}
        >
          {votes.length}
        </h2>
        <Button
          icon={<PlusOutlined />}
          style={{
            backgroundColor: '#1890FF',
            color: '#FFF',
            width: 207,
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
            placeholder='Поиск по названиям'
            value={value}
            onChange={handleSearch}
            style={{
              width: 400,
              padding: '20px 15px',
              borderBottom: '1px solid #DADADA',
            }}
            // suffix={
            //   <div>
            //     <FilterOutlined onClick={showDrawer} />
            //     <Drawer
            //       style={{
            //         height: '150px',
            //         width: '200px',
            //         borderRadius: '6px',
            //         boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
            //         overflow: 'hidden',
            //       }}
            //       title='Выбери поиск'
            //       placement='left'
            //       closable={true}
            //       onClose={onClose}
            //       open={open}
            //       getContainer={false}
            //     >
            //       <div>Поиск по названиям</div>
            //       <div>Поиск по описаниям</div>
            //     </Drawer>
            //   </div>
            // }
          />
          <div
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: 'calc(100vh - 124px - 73px)',
            }}
          >
            {value.trim() === ''
              ? votes
                  .sort((a, b) => b.id - a.id)
                  .map((x, index) => {
                    return (
                      <div
                        onClick={() => {
                          handleSelectedVote(x.id)
                        }}
                      >
                        <ListVote
                          key={x.id}
                          isEnding={x.isEnding}
                          isVoted={x.isVoted}
                          isSelected={x.id === +url_id}
                          name={x.title}
                          id={x.id}
                          date={`${prettyDate(x.startDate)} - ${prettyDate(x.endDate)}`}
                          description={x.description}
                        />
                      </div>
                    )
                  })
              : dataSource
                  .sort((a, b) => b.id - a.id)
                  .map((x, index) => {
                    return (
                      <div
                        onClick={() => {
                          handleSelectedVote(x.id)
                        }}
                      >
                        <ListVote
                          key={x.id}
                          isEnding={x.isEnding}
                          isVoted={x.isVoted}
                          isSelected={x.id === +url_id}
                          name={x.title}
                          id={x.id}
                          date={`${prettyDate(x.startDate)} - ${prettyDate(x.endDate)}`}
                          description={x.description}
                        />
                      </div>
                    )
                  })}
          </div>
        </div>

        {selectedVote && (
          <div
            style={{
              padding: '20px 30px 20px 30px',
              width: '100%',
              filter: 'drop-shadow(0px 3px 25px rgba(0, 0, 0, 0.10))',
              height: '785px',
              maxWidth: '1635px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#FFF',
                height: '60px',
                padding: '14px 20px',
                alignItems: 'center',
              }}
            >
              <div
                className='flex gap-4 '
                style={{ alignItems: 'center', height: 24 }}
              >
                <h3
                  style={{
                    lineHeight: '22px',
                    fontSize: '20px',
                    fontWeight: '700',
                  }}
                >
                  <abbr
                    title={selectedVote.title}
                    style={{ textDecoration: 'none' }}
                  >
                    {maxString(selectedVote.title, 80)}
                  </abbr>
                </h3>
                {selectedVote.isAnonymous && (
                  <Tag
                    color='blue'
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      height: 24,
                    }}
                  >
                    Анонимное голосование
                  </Tag>
                )}
              </div>
              {selectedVote.user.id === env.rootStore.selfUser.id && (
                <Button
                  onClick={() => {
                    navigate(`/vote/${url_id}/edit`)
                  }}
                >
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
                      <h4
                        className='h4 gray'
                        style={{
                          marginBottom: '15px',
                        }}
                      >
                        Организатор
                      </h4>
                      <div className='flex items-center'>
                        <img
                          src='/avatar2.jpg'
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            margin: '0 10px 0 0',
                          }}
                        ></img>
                        <p className='dark h4'>{selectedVote.user.fullName}</p>
                      </div>
                    </div>
                    <UserOutlined
                      style={{
                        marginLeft: 'auto',
                        fontSize: '24px',
                        color: 'rgba(0, 0, 0, 0.2)',
                      }}
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
                      <h4
                        className='h4 gray'
                        style={{
                          marginBottom: '15px',
                        }}
                      >
                        Сроки проведения
                      </h4>
                      <p className='dark h4'>{`${prettyDate(
                        selectedVote.startDate,
                      )} - ${prettyDate(selectedVote.endDate)}`}</p>
                    </div>
                    <FieldTimeOutlined
                      style={{
                        marginLeft: 'auto',
                        fontSize: '24px',
                        color: 'rgba(0, 0, 0, 0.2)',
                      }}
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
                    <h4
                      className='h4 gray'
                      style={{
                        marginBottom: '15px',
                      }}
                    >
                      Кол-во вопросов
                    </h4>
                    <p className='dark h4'>{selectedVote.questions.length}</p>
                  </div>
                  <CheckSquareOutlined
                    style={{
                      marginLeft: 'auto',
                      fontSize: '24px',
                      color: 'rgba(0, 0, 0, 0.2)',
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
                    alignItems: 'center',
                  }}
                >
                  <h3 className='h3'>Описание</h3>
                </div>
                <div
                  style={{
                    minHeight: '450px',
                    overflowY: 'auto',
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <p style={{ marginBottom: 20, overflowWrap: 'break-word' }}>
                    {maxString(selectedVote.description, 701)}
                  </p>
                  {selectedVote.files.length !== 0 &&
                    selectedVote.files.map((x: any) => {
                      return <VoteFiles title={x.name} link={x.url} />
                    })}
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
                    flexBasis: '66%',
                    minHeight: 400,
                    maxHeight: 700,
                    maxWidth: 1200,
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
                        alignItems: 'center',
                      }}
                    >
                      <h3 className='h3'>Описание</h3>
                    </div>
                    <div
                      style={{
                        height: '450px',
                        overflowY: 'auto',
                        padding: 20,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <p
                        style={{ marginBottom: 20, overflowWrap: 'break-word' }}
                      >
                        {maxString(selectedVote.description, 701)}
                      </p>
                      <div className='flex flex-col' style={{ rowGap: '10px' }}>
                        {selectedVote.files.length !== 0 &&
                          selectedVote.files.map((x: any) => {
                            return <VoteFiles title={x.name} link={x.url} />
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div //2column
                  style={{
                    minHeight: 480,
                    maxHeight: 700,
                    backgroundColor: '#FFF',
                    flexBasis: '34%',
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
                      borderLeft: '1px solid #DADADA',
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
                      <h3 className='h3'>Участники</h3>
                      <p
                        className='h4'
                        style={{
                          color: '#C6C6C6',
                        }}
                      >
                        {showMembers()}
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
                        borderLeft: '1px solid #DADADA',
                      }}
                    >
                      {selectedVote.attachedGroups.map((x: any, index) => {
                        return (
                          <ListUser
                            key={index}
                            mail={''}
                            name={x.name}
                            onDeleteClick={() => {}}
                            role={''}
                            members={x.users}
                          />
                        )
                      })}
                      {selectedVote.respondents.map((x: any, index) => {
                        return (
                          <ListUser
                            key={index}
                            mail={''}
                            name={x.fullName}
                            onDeleteClick={() => {}}
                            role={x.role}
                            members={[]}
                          />
                        )
                      })}
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
              {!isAlredyVoted && (
                <Button
                  className='w-200'
                  type='primary'
                  onClick={() => navigate(`/vote-progress/${selectedVote.id}`)}
                >
                  Перейти к голосованию
                </Button>
              )}
              {!isAlredyVoted && (
                <Tooltip title='Проголосуйте, чтобы посмотреть'>
                  <Button
                    disabled
                    style={{ marginLeft: 20 }}
                    onClick={() => navigate(`/vote/${selectedVote.id}/results`)}
                  >
                    Посмотреть общую статистику
                  </Button>
                </Tooltip>
              )}
              {isAlredyVoted && (
                <Button
                  onClick={() => navigate(`/vote/${selectedVote.id}/results`)}
                >
                  Посмотреть общую статистику
                </Button>
              )}
              <Button
                style={{ marginLeft: 20 }}
                onClick={() => navigate(`/vote/${selectedVote.id}/discussion`)}
              >
                Перейти к обсуждению
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default observer(VotePage)
