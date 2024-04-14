import { Instance, types as t } from 'mobx-state-tree'
import { Question } from '../types/api'
import { UserProfileModel, selfUser } from './userModel'
import { IEnv } from '../App'
import { string } from 'mobx-state-tree/dist/internal'

const files = t.model({
  file: t.string,
  name: t.string,
  type: t.string,
})
const QuestionModel = t.model({
  title: t.string,
  description: t.string,
  isMultiply: t.boolean,
  isAnonimic: t.boolean,
  answers: t.array(t.string),
  files: t.array(files),
  photos: t.array(t.string),
  isHidenCounter: t.boolean,
})

const VoteCreateModel = t
  .model({
    title: t.maybeNull(t.string),
    description: t.maybeNull(t.string),
    isAnonim: t.maybeNull(t.boolean),
    users: t.maybeNull(t.array(t.number)),
    questions: t.maybeNull(t.array(QuestionModel)),
    startDate: t.maybeNull(t.string),
    endDate: t.maybeNull(t.string),
  })
  .actions((self) => {
    return {
      setName(value: string) {
        self.title = value
      },
      setDescription(value: string) {
        self.description = value
      },
      setAnonim(value: boolean) {
        self.isAnonim = value
      },
      sendCreateVote() {},
      addQuestion(question: Question) {
        self.questions?.push(
          QuestionModel.create({
            title: question.title,
            description: question.description,
            answers: question.answers,
            files: question.files,
            photos: question.photos,
            isMultiply: question.isMultiply,
            isAnonimic: false,
            isHidenCounter: false,
          }),
        )
      },
      setDate(d1: string, d2: string) {
        self.startDate = d1
        self.endDate = d2
      },
      deleteQuestion(id: number) {
        self.questions?.splice(id, 1)
      },
      setUsers(users: number[]) {
        console.log(users)
        self.users = t.array(t.number).create(users)
      },
    }
  })

const VoteCreate = VoteCreateModel.create({
  questions: [],
  isAnonim: false,
  title: '',
  description: '',
})

const rootStoreModel = t.model({
  VoteCreate: VoteCreateModel,
  selfUser: UserProfileModel,
})

export type StoreType = Instance<typeof rootStoreModel>

export const CreateRootStore = (env: IEnv) => {
  return rootStoreModel.create(
    {
      VoteCreate,
      selfUser,
    },
    env,
  )
}
