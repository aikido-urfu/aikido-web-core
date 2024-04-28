import { Button, Progress } from 'antd'
import React, { useEffect } from 'react'
import { GetVoteById } from '../../types/api'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEnv } from '../../App'
import { Tiny, Pie, Column } from '@ant-design/plots'

const Results: React.FC = () => {
  const [selectedVote, setselectedVote] = useState<GetVoteById>()
  const { id } = useParams()
  const navigate = useNavigate()
  const env = useEnv()

  useEffect(() => {
    env.API.getVote(Number(id))
      .then((res) => {
        setselectedVote(res.data)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [id])

  // const percent = selectedVote?.questions[0].answers.length

  const data = selectedVote?.questions[0].answers.map((answ) => {
    const obj = {
      type: answ.text,
      value: answ.count,
    }
    console.log(selectedVote)
    return obj
  })

  type TinyType = {
    width: number
    height: number
    showInfo: boolean
    autoFit: boolean
    percent: number
    color: string[]
    annotations: any
  }

  const getPercentOfVoted = () => {
    const usersVoted = selectedVote?.usersVoted.length
    const respondents = selectedVote?.respondents.length
    if (
      typeof usersVoted !== 'undefined' &&
      typeof respondents !== 'undefined'
    ) {
      return usersVoted / respondents
    }
  }

  const TinyProgress = () => {
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

  type PieType = {
    data: any
    angleField: string
    colorField: string
    label: any
    legend: any
  }

  const CustomPie = () => {
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

  const CustomColumn = () => {
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
            navigate(-1)
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
          <TinyProgress />
        </div>
        <div
          className='pl-[40px]'
          style={{
            borderTop: '1px solid #DADADA',
          }}
        ></div>
        <div>
          {selectedVote?.questions.map((x) => (
            <div
              style={{
                borderBottom: '1px solid #DADADA',
              }}
            >
              <h3 className='px-[20px] h-[50px] flex items-center'>
                {x.title}
              </h3>
              <div className='px-[20px] w-[422px] h-[381px]'>
                {selectedVote?.usersVoted.length > 5 ? (
                  <CustomPie />
                ) : (
                  <CustomColumn />
                )}
              </div>
            </div>
          ))}
        </div>
      </span>
    </div>
  )
}

export default Results
