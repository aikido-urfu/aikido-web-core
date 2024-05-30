import { Button, DatePicker, Input, Switch, UploadFile, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useEnv } from '../../App'
import { SelectUsers, ListUser, VoteCreate } from '../../pages'
import { GetUsers, PostFiles } from '../../types/api'
import dayjs, { Dayjs } from 'dayjs'
import {
  FileJpgOutlined,
  UploadOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
import { GetVoteById, PostVote, Question } from '../../types/api'
import { useParams } from 'react-router-dom'
import type { UploadProps } from 'antd/es/upload/interface'

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
  const env = useEnv()
  const { rootStore } = useEnv()
  const voteCreate = rootStore.VoteCreate
  const [users, setusers] = useState<GetUsers>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [idList, setIdList] = useState<number[]>([])
  const [propsFile, setProps] = useState<any>('')
  const [selVoteTitle, setSelVoteTitle] = useState('')
  const [selVoteDesc, setSelVoteDesc] = useState('')
  const { id } = useParams()
  const url_id = id || ''

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newIdList = idList.slice()
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      newIdList.splice(index, 1)
      setFileList(newFileList)
      setIdList(newIdList)
    },
    beforeUpload: (file) => {
      env.API.uploadFiles(file)
        .then((res: { data: PostFiles }) => {
          voteCreate.addDocument(res.data)
          setFileList([...fileList, file])
          setIdList([...idList, res.data.id])
        })
        .catch((err) => {
          env.messageApi.error(err)
        })

      return false
    },
    fileList,
  }

  const getStartDate = () => {
    if (voteCreate.startDate !== undefined && voteCreate.startDate !== null) {
      return dayjs(voteCreate.startDate)
    } else {
      return null
    }
  }

  const getEndDate = () => {
    if (voteCreate.endDate !== undefined && voteCreate.endDate !== null) {
      return dayjs(voteCreate.endDate)
    } else {
      return null
    }
  }

  const rangePickerHandler = (val: any) => {
    if (val?.length != 2) return
    const [d1, d2] = val
    voteCreate.setDate(d1!.toISOString(), d2!.toISOString())
  }

  type DocumentsType = {
    data: any
    id: number
    onDeleteClick: (id: number) => void
  }

  const handleDeleteQuestionClick = (id: number) => {
    voteCreate.deleteFiles(id)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            borderBottom: '1px solid #DADADA',
            height: 802,
            display: 'flex',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexBasis: '72%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'end',
                gap: 20,
                marginBottom: 20,
                width: '100%',
                padding: '20px 16px 0 20px',
              }}
            >
              <div
                style={{
                  flexBasis: '46%',
                }}
              >
                <p
                  className='small-title light-gray'
                  style={{ marginBottom: 5 }}
                >
                  Название
                </p>
                <Input
                  style={{ minWidth: 100 }}
                  onChange={(e) => voteCreate.setName(e.target.value)}
                  value={voteCreate.title || ''}
                ></Input>
              </div>
              <div
                style={{
                  flexBasis: '54%',
                }}
              >
                <p
                  className='small-title light-gray'
                  style={{ marginBottom: 5 }}
                >
                  Сроки проведения
                </p>
                <DatePicker.RangePicker
                  placeholder={['Время начала', 'Время окончания']}
                  style={{ display: 'flex', minWidth: 150 }}
                  showTime={{ format: 'HH:mm' }}
                  format='YYYY-MM-DD HH:mm'
                  // needConfirm={false}
                  // defaultValue={[getStartDate(), getEndDate()]}
                  onChange={rangePickerHandler}
                  value={[getStartDate(), getEndDate()]}
                />
              </div>
            </div>
            <div>
              <p
                className='small-title light-gray'
                style={{
                  marginBottom: 5,
                  width: '100%',
                  padding: '0px 0px 0 20px',
                }}
              >
                Описание
              </p>
              <div style={{ padding: '0px 16px 0 20px', marginBottom: '20px' }}>
                <TextArea
                  rows={3}
                  onChange={(e) => voteCreate.setDescription(e.target.value)}
                  value={voteCreate.description || ''}
                ></TextArea>
              </div>
              <div
                className='flex gap-x-[10px]'
                style={{ padding: '0px 0px 0 20px' }}
              >
                <p>Анонимное</p>
                <Switch
                  checked={voteCreate.isAnonim || false}
                  onChange={(e) => voteCreate.setAnonim(e)}
                ></Switch>
              </div>
              <div
                style={{
                  margin: '30px 0 20px 0',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: '0px 0px 0 20px',
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
              <div>
                <div
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
                  <SelectUsers setSelectedUsers={setusers} />
                </div>
              </div>
              <div style={{ height: '425px', overflowY: 'scroll' }}>
                {...users.map((x: any) => {
                  return (
                    <ListUser
                      name={x.fullName}
                      role={x.role}
                      mail={''}
                      isCanBeDeleted={true}
                      onDeleteClick={() => {
                        // onDeleteClick(x.id)
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexBasis: '28%',
              width: '100%',
              flexDirection: 'column',
              borderLeft: '1px solid #DADADA',
            }}
          >
            <div
              style={{
                borderBottom: '1px solid rgba(218, 218, 218, 1)',
                padding: '12px 16px',
              }}
            >
              <Upload listType='picture' {...props}>
                <Button icon={<UploadOutlined />}>Загрузить документ</Button>
              </Upload>
            </div>
            {/* {voteCreate.documents?.length !== 0 ? return } */}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', height: 60 }}>
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
        </div>
      </div>
    </>
  )
})

export default FirstStep
