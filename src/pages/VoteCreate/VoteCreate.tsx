import { Button, Input, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { ListUser } from '../Vote/ListUser';
import { USERS_MOCK } from '../Vote/Vote';
import { FirstStep } from './FirstStep';
import { SecondStep } from './SecondStep';
import { useLocation, useNavigate } from 'react-router-dom';
import { rootStore } from '../../models/voteCreate';
const { TextArea } = Input;
import { observer } from "mobx-react-lite"


const Step = Steps.Step;
const VoteCreate: React.FC = () => {
  const [step, setstep] = useState(0);
  const navigate = useNavigate()
  const voteCreateModel = rootStore.VoteCreate
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
          height: '100%',
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
          <h3>Основная информация и участники</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}
          >
            <Steps current={step} >
              <div>
                <Step title="Finished" description="This is a description." />
                Основная информация и участники</div>
              <div style={{
                ...(step === 0 ? {
                  color: 'rgba(0, 0, 0, 0.45)'
                } : {})
              }}>Вопросы к голосованию</div>
              </Steps>
          </div>
        </div>
        {step === 0 ? <FirstStep onStepChange={(x) => {setstep(x)}} /> : step === 1 ? <SecondStep onStepChange={(x) => setstep(x)} /> : null}
      </div>
    </>
  );
};

export default observer(VoteCreate)