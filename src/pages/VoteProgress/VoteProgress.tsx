import React, { useEffect, useState } from 'react'
import './index.css'
import { Button, Checkbox, Progress, Radio, Space, message } from 'antd'
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { useEnv } from '../../App'
import { GetVoteById } from '../../types/api'

type BottomControlType = {
  onBackClick?: () => void
  onNextClick?: () => void
  isShowBack?: boolean
  isShowNext?: boolean
  nextText?: string
  backText?: string
}

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
  )
}
BottomControl.defaultProps = {
  backText: 'Перейти назад',
  nextText: 'Перейти далее',
  isShowBack: true,
  isShowNext: true,
}

const VoteProgress: React.FC = () => {
  const env = useEnv()
  const [sendPage, setsendPage] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [selectedVote, setselectedVote] = useState<GetVoteById | undefined>()
  const selectedPage = Number(searchParams.get('selectedPage')) ?? 0
  const [selectedQuest, setselectedQuest] = useState(selectedPage)
  const selectedQuestion = selectedVote?.questions[selectedPage]
  const QUESTIONS_MOCK = selectedVote?.questions.map((x, index) => index)
  const [answers, setanswers] = useState<{ [K: number]: Array<number> }>({})

  const handleSetSelectedPage = (selectedPage: number) => {
    setselectedQuest(selectedPage)
    navigate({
      pathname: '',
      search: createSearchParams({
        selectedPage: selectedPage.toString(),
      }).toString(),
    })
  }

  useEffect(() => {
    env.API.getVote(Number(id))
      .then((res) => {
        setselectedVote(res.data)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [id, selectedPage])

  const handleAnswerSet = (value: number) => {
    if (selectedQuestion) {
      const isMulty = selectedQuestion.isMultiply
      const questId = selectedQuestion.id
      if (!isMulty) {
        const newObj = { ...answers, [questId]: [value] }
        setanswers(newObj)
      } else {
        const newObj = { ...answers }
        if (!newObj[questId]) newObj[questId] = []
        const arr = newObj[questId]
        const index = arr.indexOf(value)
        if (index !== -1) {
          arr.splice(index, 1)
        } else {
          arr.push(value)
        }
        setanswers(newObj)
      }
    }
  }

  const isSelected = (id: number) => {
    if (selectedQuestion) {
      const questId = selectedQuestion.id
      return (
        answers[questId] != undefined && answers[questId].indexOf(id) !== -1
      )
    }
    return false
  }

  const canSendAnswers = () => {
    return (
      selectedVote &&
      selectedVote.questions.length ===
        Object.values(answers).filter((x) => x.length !== 0).length
    )
  }

  const handleSendAnswers = () => {
    if (selectedQuestion) {
      env.API.sendAnswers(answers, selectedVote.id)
        .then((res) => {
          env.logger.info(res)
          navigate('/completed', {
            state: {
              text: 'Поздравляем! Ответы отправлены',
            },
          })
        })
        .catch((err) => {
          message.error(err.response.data.response.message)
        })
    }
  }
  // eslint-disable-next-line react/no-unescaped-entities
  if (!selectedQuestion) {
    navigate('/completed', {
      state: {
        text: 'Что то пошло не так',
      },
    })
    return <></>
  }
  return (
    <div className='flexflex-col'>
      <div
        style={{
          borderBottom: '1px solid #DADADA',
        }}
        className='h-[60px] bg-white flex gap-3 items-center pl-[30px]'
      >
        <h3>Прохождение голосования</h3>
        <Button
          onClick={() => {
            navigate(-1)
          }}
        >
          Назад
        </Button>
      </div>
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
                <p>
                  Пройдено{' '}
                  {Object.values(answers).filter((x) => x.length != 0).length}/
                  {selectedVote.questions.length}
                </p>
              </div>
              <div style={{}}>
                {...selectedVote.questions.map((x, index) => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20,
                        height: 90,
                        padding: '0 14px',
                        borderBottom: '1px solid #DADADA',
                      }}
                    >
                      <h4>{index + 1}</h4>
                      <div>
                        <h4>{x.title}</h4>
                        <p style={{ color: 'gray' }}>
                          Ваш ответ:{' '}
                          <span style={{ color: '#1890FF' }}>
                            {answers[x.id]?.length ? (
                              x.answers
                                .filter(
                                  (ans) => answers[x.id].indexOf(ans.id) != -1,
                                )
                                .map((x) => x.text)
                                .join(',')
                            ) : (
                              <span style={{ color: 'red' }}>Отсутствует</span>
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <BottomControl
              onBackClick={() => setsendPage(false)}
              backText='Вернуться к голосованию'
              nextText='Закончить голосование'
              onNextClick={() => {
                if (canSendAnswers()) {
                  //do stuf
                  handleSendAnswers()
                } else {
                  env.messageApi.error('Нужно ответить на все вопросы')
                }
              }}
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
                {selectedQuestion.photos.map((x) => {
                  return (
                    <img
                      src={x}
                      style={{
                        width: 600,
                        height: 300,
                        backgroundRepeat: 'no-repeat',
                        objectFit: 'contain',
                      }}
                    ></img>
                  )
                })}
                {!selectedQuestion.isMultiply ? (
                  <>
                    <Space direction='vertical'>
                      {selectedQuestion.answers.map((x) => (
                        <Radio
                          checked={isSelected(x.id)}
                          onChange={() => handleAnswerSet(x.id)}
                          value={x.text}
                        >
                          {x.text}
                        </Radio>
                      ))}
                    </Space>
                  </>
                ) : (
                  <>
                    <Space direction='vertical'>
                      {selectedQuestion.answers.map((x) => (
                        <Checkbox
                          checked={isSelected(x.id)}
                          onChange={() => {
                            handleAnswerSet(x.id)
                          }}
                        >
                          {x.text}
                        </Checkbox>
                      ))}
                    </Space>
                  </>
                )}
              </div>
              <BottomControl
                isShowBack={selectedQuest > 0}
                isShowNext
                onNextClick={() => {
                  selectedQuest < (QUESTIONS_MOCK?.length || 0) - 1
                    ? handleSetSelectedPage(selectedQuest + 1)
                    : setsendPage(true)
                }}
                onBackClick={() => handleSetSelectedPage(selectedQuest - 1)}
                nextText={
                  selectedQuest < (QUESTIONS_MOCK?.length || 0) - 1
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
                    (Object.values(answers).filter((x) => x.length != 0)
                      .length /
                      (QUESTIONS_MOCK?.length || 1)) *
                      100,
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
                {QUESTIONS_MOCK?.map((x) => {
                  return (
                    <div
                      className='pointer'
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
                        handleSetSelectedPage(x)
                      }}
                    >
                      <div>{x + 1}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default VoteProgress
