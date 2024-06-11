import { Button, DatePicker, Input, Switch, UploadFile, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useEnv } from '../../App'
import { SelectUsersEdit, ListUser, VoteEdit } from '..'
import { GetGroups, GetUsers, PostFiles, GetUserById } from '../../types/api'
import dayjs, { Dayjs } from 'dayjs'
import {
  FileJpgOutlined,
  UploadOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
import { GetVoteById, PostVote, Question } from '../../types/api'
import { useNavigate, useParams } from 'react-router-dom'
import type { UploadProps } from 'antd/es/upload/interface'

type FirstStepType = {
  onStepChange: (step: number) => void
  edit: boolean
  setEdit: any
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

const FirstStepEdit: React.FC<FirstStepType> = observer(
  ({ onStepChange, edit, setEdit }) => {
    const env = useEnv()
    const { rootStore } = useEnv()
    const voteEdit = rootStore.VoteCreate
    const navigate = useNavigate()
    const [defaultUsers, setusers] = useState<GetUsers>([])
    const [groups, setgroups] = useState<GetGroups[]>([])
    const [idList, setIdList] = useState<number[]>([])
    const [propsFile, setProps] = useState<any>('')
    const [fileDoc, setFileDoc] = useState<any>([])
    const [userList, setUserList] = useState<any>([])
    const [selectEdit, setSelectEdit] = useState<boolean>(false)

    const clearPlaceholders = () => {
      voteEdit.deleteName()
      voteEdit.deleteDescription()
      voteEdit.deleteAnonim()
      voteEdit.deleteAllUsers()
      voteEdit.deleteAllGroups()
      voteEdit.deleteDate()
      voteEdit.deleteAllQuestions()
      voteEdit.deleteAllDocuments()
    }

    const navToVoteHandler = () => {
      clearPlaceholders()
      navigate('/vote')
    }

    const getVoteEdit = () => {
      if (!edit) return
      env.API.getVote(+url_id)
        .then((res) => {
          // clearPlaceholders()
          voteEdit.create(res.data)
        })
        .catch((err) => {
          env.logger.error(err)
          navToVoteHandler()
        })
    }

    useEffect(() => {
      getVoteEdit()
      setEdit(true)
    }, [])

    useEffect(() => {
      setEdit(false)
      console.log(voteEdit.users.length)
      if (voteEdit.users.length !== 0 || voteEdit.groups.length !== 0) {
        setSelectEdit(true)
      }
      if (voteEdit?.documents?.length !== 0) {
        fileDoc.splice(0, fileDoc.length)
        voteEdit?.documents?.forEach((x: PostFiles, index: number) => {
          fileDoc.push({
            uid: `${index}`,
            name: x.name,
            url: x.url,
          })
          // voteEdit.deleteAllDocuments()
        })
      }
    }, [getVoteEdit])

    // useEffect(() => {
    //   if (voteEdit.users?.length !== 0) {
    //     voteEdit.users?.forEach((x, index) => {
    //       env.API.getUserById(x).then((res: { data: GetUserById }) => {
    //         userList.push(res.data)
    //       })
    //     })
    //   }
    // }, [])

    const defaultDocs = fileDoc.length === undefined ? [] : fileDoc

    const [fileList, setFileList] = useState<UploadFile[]>(defaultDocs)

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
        voteEdit.deleteDocument(index)
      },
      beforeUpload: (file) => {
        env.API.uploadFiles(file)
          .then((res: { data: PostFiles }) => {
            voteEdit.addDocument(res.data)
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

    const countUsers = () => {
      let usersFromGroups = 0
      voteEdit.groups.forEach((x) => {
        usersFromGroups += x.users.length
      })
      return voteEdit.users.length + usersFromGroups
    }

    const getStartDate = () => {
      if (voteEdit.startDate !== undefined && voteEdit.startDate !== null) {
        return dayjs(voteEdit.startDate)
      } else {
        return null
      }
    }

    const getEndDate = () => {
      if (voteEdit.endDate !== undefined && voteEdit.endDate !== null) {
        return dayjs(voteEdit.endDate)
      } else {
        return null
      }
    }

    const rangePickerHandler = (val: any) => {
      if (val?.length != 2) return
      const [d1, d2] = val
      voteEdit.setDate(d1!.toISOString(), d2!.toISOString())
    }

    type DocumentsType = {
      data: any
      id: number
      onDeleteClick: (id: number) => void
    }

    const handleDeleteQuestionClick = (id: number) => {
      voteEdit.deleteFiles(id)
    }

    const filteredByUniqId = (arr: any) => {
      const keys = ['id']
      return arr.filter((value: any, index: number, self: any) => {
        return (
          self.findIndex((v: any) => keys.every((k) => v[k] === value[k])) ===
          index
        )
      })
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
              height: 602,
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
                    onChange={(e) => voteEdit.setName(e.target.value)}
                    value={voteEdit.title || ''}
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
                <div
                  style={{ padding: '0px 16px 0 20px', marginBottom: '20px' }}
                >
                  <TextArea
                    rows={3}
                    onChange={(e) => voteEdit.setDescription(e.target.value)}
                    value={voteEdit.description || ''}
                  ></TextArea>
                </div>
                <div
                  className='flex gap-x-[10px]'
                  style={{ padding: '0px 0px 0 20px' }}
                >
                  <p>Анонимное</p>
                  <Switch
                    checked={voteEdit.isAnonim || false}
                    onChange={(e) => voteEdit.setAnonim(e)}
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
                    {countUsers()}
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
                    <SelectUsersEdit
                      selectEdit={selectEdit}
                      setSelectEdit={setSelectEdit}
                      setSelectedUsers={setusers}
                      setSelectedGroups={setgroups}
                    />
                  </div>
                </div>
                <div style={{ height: '224px', overflowY: 'scroll' }}>
                  {filteredByUniqId(voteEdit['groups']).map((x: any) => {
                    return (
                      <ListUser
                        name={x.name}
                        role={''}
                        mail={''}
                        isCanBeDeleted={true}
                        onDeleteClick={() => {
                          // onDeleteClick(x.id)
                        }}
                        members={x.users}
                      />
                    )
                  })}
                  {filteredByUniqId(voteEdit['users']).map((x: any) => {
                    return (
                      <ListUser
                        name={x.fullName}
                        role={x.role}
                        mail={''}
                        isCanBeDeleted={true}
                        onDeleteClick={() => {
                          // onDeleteClick(x.id)
                        }}
                        members={[]}
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
                overflowY: 'scroll',
              }}
            >
              <div
                style={{
                  borderBottom: '1px solid rgba(218, 218, 218, 1)',
                  padding: '12px 16px',
                }}
              >
                <Upload
                  listType='picture'
                  {...props}
                  defaultFileList={fileList}
                >
                  <Button icon={<UploadOutlined />}>Загрузить документ</Button>
                </Upload>
              </div>
              {/* {voteCreate.documents?.length !== 0 ? (
              <Upload listType='picture' {...props} defaultFileList={}></Upload>
            ) : null} */}
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
  },
)

export default FirstStepEdit
