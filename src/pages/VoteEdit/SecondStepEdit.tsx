import { Button } from 'antd'
import React, { useState } from 'react'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { PostVote, Question } from '../../types/api'
import { useEnv } from '../../App'
import { observer } from 'mobx-react-lite'
import { ModalAddQuestion } from '..'
import { GetVoteById } from '../../types/api'
import { maxString } from '../../api/tools'

type QuestionType = {
  data: Question
  id: number
  onDeleteClick: (id: number) => void
}

const QuestionBlock: React.FC<QuestionType> = ({ data, id, onDeleteClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: 80,
        backgroundColor: '#FFF',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #DADADA',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
        }}
      >
        {id + 1 > 1 && <ArrowUpOutlined style={{ fontSize: '150%' }} />}
        <ArrowDownOutlined style={{ fontSize: '150%' }} />
        {id + 1}
        <div>
          <h4>{maxString(data.title, 80)}</h4>
          <p className='gray'>{maxString(data.description, 80)}</p>
        </div>
      </div>
      <DeleteOutlined
        className='pointer'
        onClick={() => onDeleteClick(id)}
        style={{ fontSize: '150%' }}
      />
    </div>
  )
}

type SecondStepType = {
  onStepChange?: (step: number) => void
  onFInallizeVote: (data: PostVote) => void
}
const SecondStepEdit: React.FC<SecondStepType> = ({
  onStepChange,
  onFInallizeVote,
}) => {
  const [isShowModal, setshowModal] = useState(false)
  const { rootStore } = useEnv()
  const voteCreateModel = rootStore.VoteCreate
  const env = useEnv()

  const showModal = () => {
    setshowModal(true)
  }

  const onQuestionAdd = (data: Question) => {
    voteCreateModel.addQuestion(data)
  }

  const handleSendClick = () => {
    const filesId: number[] = []
    if (voteCreateModel.documents?.length !== 0) {
      voteCreateModel.documents?.filter((x: any) => {
        filesId.push(x.id)
      })
    }
    const usersId: number[] = []
    if (voteCreateModel.users?.length !== 0) {
      voteCreateModel.users?.filter((x: any) => {
        usersId.push(x.id)
      })
    }
    const groupsId: number[] = []
    if (voteCreateModel.groups?.length !== 0) {
      voteCreateModel.groups?.filter((x: any) => {
        groupsId.push(x.id)
      })
    }
    const res: PostVote = {
      title: voteCreateModel.title || '',
      description: voteCreateModel.description || '',
      startDate: voteCreateModel.startDate || '',
      endDate: voteCreateModel.endDate || '',
      isAnonymous: !!voteCreateModel.isAnonim,
      isEnding: false,
      isVoted: false,
      isHidenCounter: false,
      files: filesId,
      photos: [],
      questions: voteCreateModel.questions || [],
      respondents: usersId,
      groups: groupsId,
    }
    const checkField = (obj: PostVote, field: keyof PostVote) => {
      if (Array.isArray(obj[field])) {
        //@ts-expect-error AAA
        if (obj[field].length === 0) {
          if (field === 'questions') {
            env.messageApi.error('Не задан вопрос голосования')
          } else if (field === 'respondents') {
            env.messageApi.error('Не заданы участники')
          }
          return false
        }
        return true
      }
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(field) && obj[field] !== '') {
        return true
      } else {
        switch (field) {
          case 'title':
            env.messageApi.error('Не задано название голосования')
            break
          case 'description':
            env.messageApi.error('Не задано описание')
            break
          case 'endDate':
            env.messageApi.error('Не задан конец голосования')
            break
          case 'questions':
            env.messageApi.error('Не задан вопрос голосования')
            break
        }
      }
    }
    const checkValueRespondents = (obj: PostVote) => {
      if (obj['groups'].length === 0 && obj['respondents'].length === 0) {
        env.messageApi.error('Не заданы участники')
        return false
      }
      return true
    }
    checkField(res, 'title') &&
      checkField(res, 'description') &&
      checkField(res, 'endDate') &&
      checkField(res, 'questions') &&
      checkValueRespondents(res) &&
      onFInallizeVote(res)
  }

  const handleDeleteQuestionClick = (id: number) => {
    voteCreateModel.deleteQuestion(id)
  }

  return (
    <div
      style={{
        maxHeight: '800px',
      }}
    >
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
        <div className='pointer' onClick={showModal}>
          <p className='select-none	'>Добавить вопрос +</p>
        </div>
      </div>
      {voteCreateModel.questions?.map((x, index) => {
        return (
          <QuestionBlock
            onDeleteClick={handleDeleteQuestionClick}
            id={index}
            data={x}
          />
        )
      })}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button
          onClick={handleSendClick}
          style={{
            margin: '20px 10px 20px 20px',
            backgroundColor: '#1890FF',
            color: '#FFF',
          }}
        >
          Создать
        </Button>
        <Button
          style={{
            margin: '20px 10px 20px 20px',
          }}
          onClick={() => onStepChange && onStepChange(0)}
        >
          Назад
        </Button>
      </div>
      <ModalAddQuestion
        onAddClick={onQuestionAdd}
        isShowModal={isShowModal}
        setshowModal={setshowModal}
      />
    </div>
  )
}

export default observer(SecondStepEdit)
