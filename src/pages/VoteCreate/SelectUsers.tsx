import React, { useState } from 'react'
import { Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import { useEnv } from '../../App'
import { GetUsers } from '../../types/api'

type SelectedUsersType = {
  setSelectedUsers: (val: GetUsers) => void
}

const SelectUsers: React.FC<SelectedUsersType> = ({ setSelectedUsers }) => {
  const [options, setoptions] = useState<SelectProps['options']>([])
  const [selectedUsers, setData] = useState<GetUsers>([])
  const env = useEnv()
  const { rootStore } = useEnv()
  const voteCreate = rootStore.VoteCreate

  const handleChange = (value: string[]) => {
    const newVal = selectedUsers?.filter((x) => value.includes(x.fullName))
    setSelectedUsers(newVal)
    const users: number[] = []
    newVal.forEach((value) => {
      users.push(value.id)
    })
    voteCreate.setUsers(users)
  }

  const loadUsers = () => {
    env.API.getUsersAll()
      .then((res) => {
        const newOptions = res.data?.map((x) => ({
          label: x.fullName,
          value: x.fullName,
        }))
        setoptions(newOptions)
        setData(res.data)
      })
      .catch((err) => env.messageApi.error(err))
  }
  return (
    <Space style={{ width: '100%' }} direction='vertical'>
      <Select
        onClick={loadUsers}
        mode='multiple'
        allowClear
        style={{ width: '100%' }}
        placeholder='Иван Иванов...'
        defaultValue={[]}
        onChange={handleChange}
        options={options}
      />
    </Space>
  )
}

export default SelectUsers
