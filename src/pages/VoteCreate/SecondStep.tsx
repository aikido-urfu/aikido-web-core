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
import { ModalAddQuestion } from './ModalAddQuestion'

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
          <h4>{data.title}</h4>
          <p className='gray'>{data.description}</p>
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
const SecondStep: React.FC<SecondStepType> = ({
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
    const res: PostVote = {
      title: voteCreateModel.title || '',
      description: voteCreateModel.description || '',
      dateOfStart: voteCreateModel.dateOfStart || '',
      dateOfEnd: voteCreateModel.dateOfEnd || '',
      isAnonymous: !!voteCreateModel.isAnonim,
      isActive: true,
      isHidenCounter: false,
      privateUsers: [],
      files: [],
      photos: [],
      questions: voteCreateModel.questions || [],
    }
    const checkField = (obj: PostVote, field: keyof PostVote) => {
      if (Array.isArray(obj[field])) {
        //@ts-expect-error AAA
        if (obj[field].length === 0) {
          env.messageApi.error(`Поле ${field} должно иметь длину больше 0`)
          return false
        }
        return true
      }
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(field) && obj[field] !== '') {
        return true
      } else {
        env.messageApi.error(`Поле ${field} должно быть заполненно`)
      }
    }
    checkField(res, 'title') &&
      checkField(res, 'description') &&
      checkField(res, 'dateOfEnd') &&
      checkField(res, 'questions') &&
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

export default observer(SecondStep)
