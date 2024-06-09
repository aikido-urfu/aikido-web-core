import { applySnapshot, getEnv, types as t } from 'mobx-state-tree'
import { IEnv } from '../App'

type Group = { id: number; name: string }

export type UserTypeGet = {
  id: number
  email: string
  fullName: string
  phone: string | null
  photo: string | null
  telegram: string | null
  telegramUserID: string | null
  role: string
  group: Group | null
}

const GroupModel = t.model({
  id: t.number,
  name: t.string,
})

export const UserProfileModel = t
  .model()
  .props({
    id: t.number,
    email: t.maybe(t.string),
    fullName: t.maybe(t.string),
    telegram: t.maybeNull(t.string),
    role: t.string,
    group: t.maybeNull(GroupModel),
  })
  .actions((self) => ({
    setUserData(data: UserTypeGet) {
      applySnapshot(self, {
        fullName: data.fullName,
        id: data.id,
        email: data.email,
        telegram: data.telegramUserID,
        role: data.role,
        group: data.group,
      })
    },
    async getMySelf() {
      const env: IEnv = getEnv(self)
      env.API.getUserByToken()
        .then((res) => {
          this.setUserData(res.data)
        })
        .catch((err) => {
          env.messageApi.info('Пожалуйста авторизируйтесь')
          console.log(err)
        })
    },
  }))

export const selfUser = UserProfileModel.create({
  id: -1,
  email: '',
  fullName: '',
  telegram: '',
  role: '',
})
