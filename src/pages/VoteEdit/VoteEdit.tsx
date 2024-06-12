import { Button, Steps, message, ConfigProvider } from 'antd'
import React, { useEffect, useState } from 'react'
import { FirstStepEdit, SecondStepEdit } from '..'
import { useNavigate, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useEnv } from '../../App'
import { GetVoteById, PostVote } from '../../types/api'

const VoteEdit: React.FC = () => {
  const [step, setstep] = useState(0)
  const [edit, setEdit] = useState(true)
  const navigate = useNavigate()
  const { API, logger } = useEnv()
  const { rootStore } = useEnv()
  const voteEdit = rootStore.VoteCreate
  const { id } = useParams()
  const url_id = id || ''

  const clearPlaceholders = () => {
    voteEdit.deleteName()
    voteEdit.deleteDescription()
    voteEdit.deleteDate()
    voteEdit.deleteAnonim()
    voteEdit.deleteAllUsers()
    voteEdit.deleteAllQuestions()
    voteEdit.deleteAllDocuments()
    voteEdit.deleteAllGroups()
  }

  const navToVoteHandler = () => {
    clearPlaceholders()
    navigate('/vote')
  }

  const onFInallizeVote = (data: PostVote) => {
    API.sendEditVote(+url_id, data)
      .then((res) => {
        logger.info(res)
        clearPlaceholders()
        navigate('/completed', {
          state: {
            text: 'Голосование отредактировано',
          },
        })
      })
      .catch((err) => {
        message.error(err.response.data.message)
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
        <h3 className='title'>Редактирование голосования</h3>
        <Button onClick={() => navToVoteHandler()}>Отмена</Button>
      </div>

      <div
        //container
        style={{
          width: 'auto',
          minHeight: '100%',
          margin: '30px 30px 10px 30px',
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
          <FirstStepEdit
            edit={edit}
            setEdit={setEdit}
            onStepChange={(x) => {
              setstep(x)
            }}
          />
        ) : (
          step === 1 && (
            <SecondStepEdit
              onFInallizeVote={onFInallizeVote}
              onStepChange={(x) => setstep(x)}
            />
          )
        )}
      </div>
    </ConfigProvider>
  )
}

export default observer(VoteEdit)
