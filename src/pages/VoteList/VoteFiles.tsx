import React from 'react'
import { useEnv } from '../../App'
import { Upload, Button } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { FileJpgOutlined, DownloadOutlined } from '@ant-design/icons'

export type VoteFilesType = {
  link: string
  title: string
}

export const VoteFiles: React.FC<VoteFilesType> = ({ title, link }) => {
  console.log(link)
  return (
    <div className='flex flex-col' style={{ rowGap: '10' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 330,
          height: 52,
          padding: '12px 19px',
          outline: 'rgba(0, 0, 0, 0.1) solid 1px',
          borderRadius: '4px',
          alignItems: 'center',
        }}
      >
        <div className='flex items-center'>
          <FileJpgOutlined style={{ marginRight: '10px', fontSize: '24px' }} />
          <span className='span-file'>{title}</span>
        </div>
        <a
          style={{ color: 'rgba(0, 0, 0, 0.85)' }}
          href={link}
          download='text'
          // target='_blank'
          // rel='noreferrer'
        >
          <DownloadOutlined style={{ fontSize: '16px' }} />
        </a>
      </div>
    </div>
  )
}

export default VoteFiles
