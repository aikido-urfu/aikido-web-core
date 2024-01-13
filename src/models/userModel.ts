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
};

export const UserProfileModel = t
  .model()
  .props({
    id: t.number,
    email: t.maybe(t.string),
    fullName: t.maybe(t.string),
    telegram: t.maybeNull(t.string),
  })
  .actions((self) => ({
    setUserData(data: UserTypeGet) {
      applySnapshot(self, {
        fullName: data.fullName,
        id: data.id,
        email: data.email,
        telegram: data.telegram,
      });
    },
    async getMySelf() {
      const env: IEnv = getEnv(self);
      env.API.getUserByToken()
        .then((res) => {
          this.setUserData(res.data);
        })
        .catch((err) => {
          env.messageApi.error(err);
        });
    },
  }));

export const selfUser = UserProfileModel.create({
  id: -1,
  email: "",
  fullName: "",
  telegram: "",
});
