import { applySnapshot, getEnv, types as t } from "mobx-state-tree";
import { IEnv } from "../App";

export type UserTypeGet = {
  id: number;
  email: string;
  password: string;
  fullName: string;
  phone: string | null;
  photo: string | null;
  telegram: string | null;
  telegramUserID: string | null;
}

export const UserProfileModel = t.model()
.props({
  id: t.number,
  email: t.string,
  password: t.string,
  fullName: t.string,
  phone: t.maybeNull(t.string) ,
  photo: t.maybeNull(t.string),
  telegram: t.maybeNull(t.string),
  telegramUserID: t.maybeNull(t.string),
})
.actions(self => ({
  setUserData(data: UserTypeGet) {
    applySnapshot(self, data)
  },
  async getMySelf() {
    const env: IEnv = getEnv(self)
    const me = await env.API.getUserByToken()
    this.setUserData(me.data)
  },
}))

export const selfUser = UserProfileModel.create({
  id: -1,
  email: '',
  password: '',
  fullName: '',
  phone: '',
  photo: '',
  telegram: '',
  telegramUserID: '',
})