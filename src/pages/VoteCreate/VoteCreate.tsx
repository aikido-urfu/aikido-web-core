import { Button, Steps, message, ConfigProvider } from 'antd'
import React, { useState } from 'react'
import { FirstStep, SecondStep } from '../../pages'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useEnv } from '../../App'
import { PostVote } from '../../types/api'

const VoteCreate: React.FC = () => {
  const [step, setstep] = useState(0)
  const navigate = useNavigate()
  const { API, logger } = useEnv()

  const onFInallizeVote = (data: PostVote) => {
    API.sendCreateVote(data)
      .then((res) => {
        logger.info(res)
        navigate('/completed', {
          state: {
            text: 'Поздравляем! Голосование создано',
          },
        })
      })
      .catch((err) => {
        // console.log(err)
        message.error(err.response.data.message)
        // logger.error(err)
      })
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Steps: {
            iconSizeSM: 32,
            titleLineHeight: 24,
          },
        },
      }}
    >
      <div
        //header
        style={{
          height: 60,
          backgroundColor: '#FFF',
          padding: '6px 30px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 20,
        }}
      >
        <h3 className='title'>Создание голосования</h3>
        <Button onClick={() => navigate('/vote')}>Отмена</Button>
      </div>

      <div
        //container
        style={{
          width: 'auto',
          minHeight: '100%',
          margin: 30,
          backgroundColor: '#FFF',
        }}
      >
        <div
          style={{
            height: 60,
            borderBottom: '1px solid #DADADA',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '6px 20px',
            justifyContent: 'space-between',
          }}
        >
          <h3 className='title'>Основная информация и участники</h3>
          <div
            style={{
              flexBasis: '40%',
              display: 'flex',
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}
          >
            <Steps
              size='small'
              current={step}
              className='steps-title'
              items={[
                {
                  title: 'Основная информация и участники',
                },
                {
                  title: 'Вопросы к голосованию',
                },
              ]}
            ></Steps>
          </div>
        </div>
        {step === 0 ? (
          <FirstStep
            onStepChange={(x) => {
              setstep(x)
            }}
          />
        ) : step === 1 ? (
          <SecondStep
            onFInallizeVote={onFInallizeVote}
            onStepChange={(x) => setstep(x)}
          />
        ) : null}
      </div>
    </ConfigProvider>
  )
}

export default observer(VoteCreate)
