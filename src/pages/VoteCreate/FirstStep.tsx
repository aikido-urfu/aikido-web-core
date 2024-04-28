import { Button, DatePicker, Input, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useEnv } from '../../App'
import { SelectUsers, ListUser } from '../../pages'
import { GetUsers } from '../../types/api'
import dayjs, { Dayjs } from 'dayjs'

type FirstStepType = {
  onStepChange: (step: number) => void
}

type Generic = string
type GenericFn = (value: Dayjs) => string

export type FormatType =
  | Generic
  | GenericFn
  | Array<Generic | GenericFn>
  | {
      format: string
      type?: 'mask'
    }

const FirstStep: React.FC<FirstStepType> = observer(({ onStepChange }) => {
  const { rootStore } = useEnv()
  const voteCreate = rootStore.VoteCreate
  const [users, setusers] = useState<GetUsers>([])
  // const [savedDate, setsavedDate] = useState<any>(['', ''])

  const rangePickerHandler = (val: any) => {
    if (val?.length != 2) return
    const [d1, d2] = val
    voteCreate.setDate(d1!.toISOString(), d2!.toISOString())
  }

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
              marginBottom: 20,
            }}
          >
            <div
              style={{
                flexBasis: 700,
              }}
            >
              <p className='gray'>Название голосования</p>
              <Input
                onChange={(e) => voteCreate.setName(e.target.value)}
                value={voteCreate.title || ''}
              ></Input>
            </div>
            <div
              style={{
                flexBasis: 500,
                marginLeft: 'auto',
              }}
            >
              <p className='gray'>Сроки проведения</p>
              <DatePicker.RangePicker
                showTime={{ format: 'HH:mm' }}
                format='YYYY-MM-DD HH:mm'
                // needConfirm={false}
                onChange={rangePickerHandler}
                value={[
                  dayjs(voteCreate.startDate).isValid()
                    ? dayjs(voteCreate.startDate)
                    : null,
                  dayjs(voteCreate.endDate).isValid()
                    ? dayjs(voteCreate.endDate)
                    : null,
                ]}
              />
            </div>
            <p>Анонимное</p>
            <Switch
              checked={voteCreate.isAnonim || false}
              onChange={(e) => voteCreate.setAnonim(e)}
            ></Switch>
          </div>
          <div>
            <p className='gray'>Описание</p>
            <TextArea
              rows={4}
              onChange={(e) => voteCreate.setDescription(e.target.value)}
              value={voteCreate.description || ''}
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
                className='gray'
                style={{
                  color: 'gray',
                }}
              >
                {users.length}
              </p>
            </div>
          </div>
        </div>
        <div
          className='pointer flex'
          style={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
            color: '#1890FF',
            borderBottom: '1px solid #DADADA',
            borderTop: '1px solid #DADADA',
            padding: '0 20px',
          }}
          onClick={() => {}}
        >
          <h3>Добавить нового участника</h3>
          <SelectUsers setSelectedUsers={setusers} />
        </div>
        <div
          style={{
            overflowY: 'scroll',
            height: '280px',
          }}
        >
          {...users.map((x: { fullName: any }) => {
            return (
              <ListUser name={x.fullName} mail={''} onDeleteClick={() => {}} />
            )
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
          onStepChange(1)
        }}
      >
        Перейти далее
      </Button>
    </>
  )
})

export default FirstStep
