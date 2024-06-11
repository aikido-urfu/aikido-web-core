import { Button, Progress } from 'antd'
import React, { useEffect } from 'react'
import { GetVoteById } from '../../types/api'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEnv } from '../../App'
import { Tiny, Pie, Column } from '@ant-design/plots'
import { url } from 'inspector'

const Results: React.FC = () => {
  const [selectedVote, setselectedVote] = useState<GetVoteById>()
  const [questionsLength, setquestionsLength] = useState<number>(0)
  const { id } = useParams()
  const navigate = useNavigate()
  const env = useEnv()

  const url_id = id || ''

  useEffect(() => {
    env.API.getVote(Number(id))
      .then((res) => {
        setselectedVote(res.data)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [id])

  const getPercentOfVoted = () => {
    if (selectedVote) {
      let allRespondents = selectedVote?.respondents.length
      selectedVote.attachedGroups.forEach((group: any) => {
        allRespondents += group.users.length
      })
      const usersVoted = selectedVote?.usersVoted.length
      return usersVoted / allRespondents
    }
  }

  const TinyProgress = () => {
    if (selectedVote) {
      type TinyType = {
        width: number
        height: number
        showInfo: boolean
        autoFit: boolean
        percent: number
        color: string[]
        annotations: any
      }

      const config: TinyType = {
        width: 480,
        height: 60,
        showInfo: true,
        autoFit: false,
        percent: getPercentOfVoted() || 1,
        color: ['#EAEAEA', '#BDDBFF'],
        annotations: [
          {
            type: 'text',
            style: {
              text: `${selectedVote?.usersVoted.length}`,
              x: '50%',
              y: '50%',
              textAlign: 'center',
              fontSize: 16,
              fontStyle: 'bold',
            },
          },
        ],
      }

      return <Tiny.Progress {...config} />
    }
  }

  const CustomPie = (...props: any) => {
    if (selectedVote) {
      const { question } = props[0]

      const data = question.answers.map((answ: any) => {
        const obj = {
          type: answ.text,
          value: answ.count,
        }
        return obj
      })

      type PieType = {
        data: any
        angleField: string
        colorField: string
        label: any
        legend: any
      }

      const config: PieType = {
        data,
        angleField: 'value',
        colorField: 'type',
        label: {
          text: 'value',
          style: {
            fontWeight: 'bold',
          },
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 5,
            layout: {
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'column',
            },
          },
        },
      }
      return <Pie {...config} />
    }
  }

  const CustomColumn = (...props: any) => {
    if (selectedVote) {
      const { question } = props[0]

      const data = question.answers
        .sort((a: any, b: any) => a.id - b.id)
        .map((answ: any) => {
          const obj = {
            type: answ.text,
            value: answ.count,
          }
          return obj
        })

      const chartRef = React.useRef(null)
      const config = {
        data,
        xField: 'type',
        yField: 'value',
        colorField: 'type',
        axis: {
          x: {
            size: 40,
          },
        },
        onReady: (plot: any) => (chartRef.current = plot),
      }
      return <Column {...config} />
    }
  }

  return (
    <div>
      <div
        style={{
          borderBottom: '1px solid #DADADA',
        }}
        className='h-[60px] bg-white flex gap-3 items-center pl-[30px]'
      >
        <h3>Статистика голосования ({selectedVote?.questions.length})</h3>
        <Button
          onClick={() => {
            navigate(`/vote/${url_id}`)
          }}
        >
          Назад
        </Button>
      </div>

      <span className='bg-white flex flex-col items pb-12  m-[30px] min-h-[700px]'>
        <div className='flex items-center p-[20px]'>
          <h3 className='flex items-center mr-[20px]'>Общая сводка</h3>
          <figure
            style={{
              display: 'flex',
              background: '#BDDBFF',
              borderRadius: '50%',
              height: '16px',
              width: '16px',
              marginRight: '8px',
            }}
          ></figure>
          <span style={{ lineHeight: '20px', marginRight: '20px' }}>
            Проголосовало
          </span>
          <figure
            style={{
              display: 'flex',
              background: '#EAEAEA',
              borderRadius: '50%',
              height: '16px',
              width: '16px',
              marginRight: '8px',
            }}
          ></figure>
          <span style={{ lineHeight: '20px' }}>Воздержались</span>
        </div>
        <div className='px-[20px] mb-[10px]'>
          {selectedVote ? <TinyProgress /> : null}
        </div>
        <div
          className='pl-[40px]'
          style={{
            borderTop: '1px solid #DADADA',
          }}
        ></div>
        <div>
          {selectedVote?.questions
            .sort((a, b) => a.id - b.id)
            .map((question: any) => {
              return (
                <div
                  style={{
                    borderBottom: '1px solid #DADADA',
                  }}
                >
                  <h3
                    className='px-[20px] min-h-[50px] items-center'
                    style={{ wordWrap: 'break-word' }}
                  >
                    {question.title}
                  </h3>
                  <div className='px-[20px] w-[422px] h-[381px]'>
                    {selectedVote?.usersVoted.length > 5 ? (
                      <CustomPie question={question} />
                    ) : (
                      <CustomColumn question={question} />
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </span>
    </div>
  )
}

export default Results
