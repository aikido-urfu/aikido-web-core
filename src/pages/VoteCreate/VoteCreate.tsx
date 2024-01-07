import { Button, Input, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { ListUser } from '../Vote/ListUser';
import { USERS_MOCK } from '../Vote/Vote';
import { FirstStep } from './FirstStep';
import SecondStep from './SecondStep';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite"
import { useEnv } from '../../App';
import { PostVote } from '../../types/api';


const VoteCreate: React.FC = () => {
  const [step, setstep] = useState(0);
  const navigate = useNavigate()
  const {API, logger} = useEnv()

  const onFInallizeVote = (data: PostVote) => {
    API.sendCreateVote(data)
    .then(res => {
      logger.info(res)
      navigate('/completed', {
        state: {
          text: 'Поздравляем! Голосование создано'
        }
      })
    })
    .catch(err => {
      logger.error(err)
    })
  }

  return (
    <>
      <div
        //header
        style={{
          height: 60,
          backgroundColor: '#FFF',
          padding: '15px 20px',
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
        }}
      >
        <h3>Создание голосования</h3>
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
            padding: '0 20px',
            justifyContent: 'space-between',
          }}
        >
          <h3>Вопросы к голосованию</h3>
          <div
            style={{
              flexBasis: '40%',
              display: 'flex',
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}
          >
            <Steps size='small' current={step} items={[
              {
                title: 'Основная информация и участники'
              },
              {
                title: 'Вопросы к голосованию'
              }
            ]} >
            </Steps>
          </div>
        </div>
        {step === 0 ? <FirstStep onStepChange={(x) => {setstep(x)}} /> : step === 1 ? <SecondStep onFInallizeVote={onFInallizeVote} onStepChange={(x) => setstep(x)} /> : null}
      </div>
    </>
  );
};

export default observer(VoteCreate)