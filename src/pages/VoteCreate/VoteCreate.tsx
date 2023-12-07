import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { Switch } from 'antd';
import { ListUser } from '../Vote/ListUser';
import { USERS_MOCK } from '../Vote/Vote';
import { FirstStep } from './FirstStep';
import { SecondStep } from './SecondStep';
const { TextArea } = Input;
export const VoteCreate = () => {
  const [step, setstep] = useState(1);
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
        <Button>Отмена</Button>
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
            <div>Основная информация и участники</div>
            <div>Вопросы к голосованию</div>
          </div>
        </div>
        {step === 0 ? <FirstStep onStepChange={(x) => {setstep(x)}} /> : step === 1 ? <SecondStep /> : null}
      </div>
    </>
  );
};
