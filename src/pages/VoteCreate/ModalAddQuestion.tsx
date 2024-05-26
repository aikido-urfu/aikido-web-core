import { Button, Input, Modal, Switch } from 'antd'
import { Question } from '../../types/api'
import React, { useState } from 'react'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { useEnv } from '../../App'
// import { AddFiles } from '../../components/AddFiles/AddFiles'
// import { UploadFile } from 'antd'

type ModalAddQuestionType = {
  isShowModal: boolean
  setshowModal: (val: boolean) => void
  onAddClick: (q: Question) => void
}

const ModalAddQuestion: React.FC<ModalAddQuestionType> = ({
  isShowModal,
  setshowModal,
  onAddClick,
}) => {
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [questions, setquestions] = useState<string[]>(['', ''])
  const [isMultiply, setisMultiply] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [urlList, seturlList] = useState<string[]>([])

  const clear = () => {
    setname('')
    setdescription('')
    setquestions(['', ''])
    setisMultiply(false)
    setFileList([])
  }

  const handleAddClick = () => {
    onAddClick({
      title: name,
      description,
      files: [],
      photos: urlList,
      isMultiply,
      answers: questions,
    })
    clear()
    setshowModal(false)
  }

  const handleDeleteAnswer = (index: number) => {
    const copy = [...questions]
    copy.splice(index, 1)
    setquestions([...copy])
  }

  return (
    <Modal
      footer={[]}
      title=''
      width={1200}
      cancelText='Отмена'
      open={isShowModal}
      onOk={() => {
        handleAddClick()
      }}
      onCancel={() => {
        setshowModal(false)
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-between',
            minHeight: 800,
          }}
        >
          <div
            style={{
              width: 800,
            }}
            //создание вопроса
          >
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #DADADA',
              }}
            >
              <h3>Создание вопроса</h3>
            </div>
            <p style={{ marginTop: 20 }} className='gray'>
              Название вопроса
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 15,
              }}
            >
              <Input value={name} onChange={(e) => setname(e.target.value)} />
              <p>Мультивыбор</p>
              <Switch
                checked={isMultiply}
                onChange={(val) => setisMultiply(val)}
              />
            </div>
            <p className='gray'>Описание</p>
            <TextArea
              rows={12}
              onChange={(e) => setdescription(e.target.value)}
              value={description}
            />

            {...questions.map((x, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 15,
                    margin: '15px 0',
                  }}
                >
                  <p>{index + 1}</p>
                  <Input
                    placeholder='вариант ответа'
                    value={x}
                    onChange={(e) => {
                      questions[index] = e.target.value
                      setquestions([...questions])
                    }}
                  />
                  {index > 1 && (
                    <DeleteOutlined
                      onClick={() => handleDeleteAnswer(index)}
                      style={{ margin: '0 10px', fontSize: '125%' }}
                    />
                  )}
                </div>
              )
            })}
            <div
              className='pointer'
              style={{
                color: '#1890FF',
              }}
              onClick={() => {
                questions.push('')
                setquestions([...questions])
              }}
            >
              <h4 className='select-none	'>Добавить вариант ответа +</h4>
            </div>
          </div>
          <div
            //документы
            style={{
              width: 400,
              padding: '0 20px',
            }}
          >
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #DADADA',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0 20px 0 0',
                marginBottom: 20,
              }}
            >
              <h3>Документы</h3>
            </div>
            <AddFiles
              urlList={urlList}
              seturlList={seturlList}
              fileList={fileList}
              setFileList={setFileList}
              // title={'Загрузить файлы'}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 15,
            borderTop: '1px solid #DADADA',
            paddingTop: 20,
            margin: '20px 0 0 0',
          }}
        >
          <Button onClick={handleAddClick} type='primary'>
            Сохранить
          </Button>
          <Button onClick={() => setshowModal(false)}>Отмена</Button>
        </div>
      </div>
    </Modal>
  )
}

import { Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
type AddFiesType = {
  fileList: UploadFile<any>[]
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  urlList: string[]
  seturlList: (val: string[]) => void
}
const AddFiles: React.FC<AddFiesType> = ({
  fileList,
  setFileList,
  urlList,
  seturlList,
}) => {
  const env = useEnv()
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      const newUrlList = urlList.slice()
      newFileList.splice(index, 1)
      newUrlList.splice(index, 1)
      setFileList(newFileList)
      seturlList(newUrlList)
    },
    beforeUpload: (file) => {
      env.API.uploadPhoto(file)
        .then((res) => {
          setFileList([...fileList, file])
          seturlList([...urlList, res.data.url])
        })
        .catch((err) => {
          env.messageApi.error(err)
        })

      return false
    },
    fileList,
  }

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <Upload listType='picture' {...props}>
        <Button icon={<UploadOutlined />}>Загрузить Файлы</Button>
      </Upload>
    </div>
  )
}

export default ModalAddQuestion
