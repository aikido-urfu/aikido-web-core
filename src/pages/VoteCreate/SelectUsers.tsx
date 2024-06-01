import React, { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import { useEnv } from '../../App'
import { GetUsers, GetGroups, GetUserById } from '../../types/api'

type SelectedUsersType = {
  setSelectedUsers: (val: GetUsers) => void
  setSelectedGroups: (val: GetGroups[]) => void
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

  useEffect(() => {
    if (voteCreate.users?.length !== 0) {
      voteCreate.users?.forEach((x) => {
        env.API.getUserById(x).then((res: { data: GetUserById }) => {
          userList.push(res.data.fullName)
        })
      })
    }
  }, [userList])

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
    const users: number[] = []
    newVal.forEach((value) => {
      users.push(value.id)
    })
    voteCreate.setUsers(users)
  }

  const handleChangeGroup = (value: string[]) => {
    const newVal = selectedGroups?.filter((x) => value.includes(x.name))
    setSelectedGroups(newVal)
    const groups: number[] = []
    newVal.forEach((value) => {
      groups.push(value.id)
    })
    voteCreate.setGroups(groups)
  }

  // const getDefaultValue = () => {
  //   if (userList.length === 0 || userList === undefined) return []
  //   const defValue: any = []
  //   userList.forEach((value: any) => {
  //     defValue.push(value.id)
  //   })
  //   return defValue
  // }

  const defValue = userList

  const onDeselect = (value: any) => {
    console.log(value)
  }

  return (
    <>
      <Space style={{ width: '100%' }} direction='vertical'>
        <Select
          onClick={loadGroups}
          mode='multiple'
          allowClear
          style={{ width: '100%' }}
          placeholder='Добавить группу'
          // defaultValue={[]}
          onChange={handleChangeGroup}
          options={optionsGroup}
        />
      </Space>
      <Space style={{ width: '100%' }} direction='vertical'>
        <Select
          onClick={loadUsers}
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='Добавить нового участника +'
          defaultValue={defValue}
          onChange={handleChange}
          options={options}
          onDeselect={onDeselect}
        />
      </Space>
    </>
  )
}

export default SelectUsers
