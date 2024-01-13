import { Button, Input, Modal, Switch } from 'antd'
import { Question } from '../../types/api'
import React, { useState } from 'react'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { useEnv } from '../../App'

type ModalAddQuestionType = {
  isShowModal: boolean
  setshowModal: (val: boolean) => void
  onAddClick: (q: Question) => void
}

function convertFilesToBase64(
  files: UploadFile[],
): Promise<{ file: string; name: string; type: string }[]> {
  const promises: Promise<{ file: string; name: string; type: string }>[] = []

  for (const file of files) {
    const promise = new Promise<{ file: string; name: string; type: string }>(
      (resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve({
              file: reader.result,
              name: file.name,
              type: file.type || '',
            })
          } else {
            reject(new Error('Failed to convert file to base64'))
          }
        }
        reader.onerror = reject
        reader.readAsDataURL(file as unknown as Blob)
      },
    )

    promises.push(promise)
  }

  return Promise.all(promises)
}

export const ModalAddQuestion: React.FC<ModalAddQuestionType> = ({
  isShowModal,
  setshowModal,
  onAddClick,
}) => {
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [questions, setquestions] = useState<string[]>(['', ''])
  const [isMultiply, setisMultiply] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const env = useEnv()

  const clear = () => {
    setname('')
    setdescription('')
    setquestions(['', ''])
    setisMultiply(false)
    setFileList([])
  }

  const handleAddClick = () => {
    convertFilesToBase64(fileList)
      .then((res) => {
        onAddClick({
          title: name,
          description,
          files: [],
          photos: res,
          isMultiply,
          answers: questions,
        })
      })
      .catch((err) => env.messageApi.error(err))
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
              <h4 className='select-none	'>Добавить вопрос +</h4>
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
              }}
            >
              <h3>Документы</h3>
            </div>
            <AddFiles fileList={fileList} setFileList={setFileList} />
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
}
const AddFiles: React.FC<AddFiesType> = ({ fileList, setFileList }) => {
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])

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
