import React from 'react'
import { useEnv } from '../../App'
import { Upload, Button } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { UploadOutlined } from '@ant-design/icons'

export type AddFilesType = {
  fileList: UploadFile<any>[]
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  urlList: string[]
  seturlList: (val: string[]) => void
}

export const AddFiles: React.FC<AddFilesType> = ({
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
