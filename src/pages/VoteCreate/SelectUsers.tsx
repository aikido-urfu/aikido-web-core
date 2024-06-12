import React, { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import { useEnv } from '../../App'
import { GetUsers, GetGroups, GetUserById } from '../../types/api'

type SelectedUsersType = {
  setSelectedUsers: (val: GetUsers) => void
  setSelectedGroups: (val: GetGroups[]) => void
}

export type UserType = {
  email: string
  fullName: string
  group?: string | undefined
  id: number
  role: string
  photo: null
  phone: null
  telegramUserID: string | null
}

const SelectUsers: React.FC<SelectedUsersType> = ({
  setSelectedUsers,
  setSelectedGroups,
}) => {
  const [options, setoptions] = useState<SelectProps['options']>([])
  const [optionsGroup, setoptionsGroup] = useState<SelectProps['options']>([])
  const [selectedUsers, setData] = useState<GetUsers>([])
  const [selectedGroups, setDataGroups] = useState<GetGroups[]>([])
  const env = useEnv()
  const { rootStore } = useEnv()
  const voteCreate = rootStore.VoteCreate
  const [userList, setUserList] = useState<any>([])
  // useEffect(() => {
  //   if (voteCreate.users?.length !== 0) {
  //     voteCreate.users?.forEach((x) => {
  //       env.API.getUserById(x).then((res: { data: GetUserById }) => {
  //         userList.push(res.data.fullName)
  //       })
  //     })
  //   }
  // }, [userList])

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

  const loadGroups = () => {
    env.API.getGroupsAll()
      .then((res: any) => {
        const newOptions = res.data?.groups.map((x: GetGroups) => ({
          label: x.name,
          value: x.name,
        }))
        setoptionsGroup(newOptions)
        setDataGroups(res.data.groups)
      })
      .catch((err) => env.messageApi.error(err))
  }

  const handleChange = (value: string[]) => {
    const newVal = selectedUsers?.filter((x) => value.includes(x.fullName))
    setSelectedUsers(newVal)
    if (newVal.length !== 0) {
      voteCreate.deleteAllUsers()
      voteCreate.setUsers(newVal)
    }
  }

  const handleChangeGroup = (value: string[]) => {
    const newVal = selectedGroups?.filter((x) => value.includes(x.name))
    setSelectedGroups(newVal)
    if (newVal.length !== 0) {
      voteCreate.deleteAllGroups()
      voteCreate.setGroups(newVal)
    }
  }

  const onDeselectUsers = (value: any) => {
    voteCreate.deleteUsersByName(value)
  }

  const onDeselectGroups = (value: any) => {
    voteCreate.deleteGroupsByName(value)
  }

  const getDefUsers = () => {
    if (voteCreate.users.length <= 0) return []
    const defValue: string[] = []
    voteCreate.users.forEach((value: any) => {
      defValue.push(value.fullName)
    })
    return defValue
  }

  const getDefGroups = () => {
    if (voteCreate.groups.length <= 0) return []
    const defValue: string[] = []
    voteCreate.groups.forEach((value: any) => {
      defValue.push(value.name)
    })
    return defValue
  }

  return (
    <>
      <Space style={{ width: '100%' }} direction='vertical'>
        <Select
          onClick={loadGroups}
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='Добавить группу'
          defaultValue={getDefGroups()}
          onChange={handleChangeGroup}
          options={optionsGroup}
          onDeselect={onDeselectGroups}
        />
      </Space>
      <Space style={{ width: '100%' }} direction='vertical'>
        <Select
          onClick={loadUsers}
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='Добавить нового участника +'
          defaultValue={getDefUsers()}
          onChange={handleChange}
          options={options}
          onDeselect={onDeselectUsers}
        />
      </Space>
    </>
  )
}

export default SelectUsers
