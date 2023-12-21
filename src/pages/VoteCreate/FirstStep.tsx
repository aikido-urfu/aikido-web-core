import { Button, DatePicker, Input, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { USERS_MOCK } from '../Vote/Vote';
import { ListUser } from '../Vote/ListUser';
import { rootStore } from '../../models/voteCreate';
import { observer } from 'mobx-react-lite';

type FirstStepType = {
  onStepChange: (step: number) => void;
};

export const FirstStep: React.FC<FirstStepType> = observer(
  ({ onStepChange }) => {
    const voteCreate = rootStore.VoteCreate;

    return (
      <>
        <div
          style={{
            minHeight: 332,
            borderBottom: '1px solid #DADADA',
          }}
        >
          <div
            style={{
              padding: '20px 20px 0 20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'end',
                gap: 20,
                marginBottom: 20
              }}
            >
              <div
                style={{
                  flexBasis: 700,
                }}
              >
                <p>Название голосования</p>
                <Input
                  onChange={(e) => voteCreate.setName(e.target.value)}
                  value={voteCreate.title}
                ></Input>
              </div>
              <div
                style={{
                  flexBasis: 500,
                  marginLeft: 'auto',
                }}
              >
                <p>Дата проведения мероприятия</p>
                <DatePicker.RangePicker onChange={val => {
                  if(val.length != 2) return
                  const d1  = val[0]
                  const d2  = val[1]
                  voteCreate.setDate(d1.toISOString(), d2.toISOString())
                }} format={'YYYY-MM-DD'} />
              </div>
              <p>Анонимное</p>
              <Switch
                checked={voteCreate.isAnonim}
                onChange={(e) => voteCreate.setAnonim(e)}
              ></Switch>
            </div>
            <div>
              <p>Описание</p>
              <TextArea
                rows={6}
                onChange={(e) => voteCreate.setDescription(e.target.value)}
                value={voteCreate.description}
              ></TextArea>
              <div
                style={{
                  margin: '30px 0 20px 0',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <h3>Участники</h3>
                <p
                  style={{
                    color: 'gray',
                  }}
                >
                  22
                </p>
              </div>
            </div>
          </div>
          <div
            className="pointer"
            style={{
              height: 60,
              display: 'flex',
              alignItems: 'center',
              color: '#1890FF',
              borderBottom: '1px solid #DADADA',
              borderTop: '1px solid #DADADA',
              padding: '0 20px',
            }}
          >
            <h3>Добавить нового участника +</h3>
          </div>

          <div
            style={{
              overflowY: 'scroll',
              height: '450px',
            }}
          >
            {...USERS_MOCK.map((x) => {
              return (
                <ListUser
                  name={x.name}
                  mail={x.mail}
                  isCanBeDeleted
                  onDeleteClick={() => {}}
                />
              );
            })}
          </div>
        </div>
        <Button
          style={{
            backgroundColor: '#1890FF',
            margin: '10px 20px',
            color: '#FFF',
          }}
          onClick={() => {
            onStepChange(1);
          }}
        >
          Перейти далее
        </Button>
      </>
    );
  }
);
