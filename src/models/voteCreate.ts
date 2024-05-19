import { Instance, types as t, cast } from 'mobx-state-tree'
import { Question } from '../types/api'
import { UserProfileModel, selfUser } from './userModel'
import { IEnv } from '../App'
// import { string } from 'mobx-state-tree/dist/internal'

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
    users: t.maybeNull(t.array(t.integer)),
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
        self.users = cast(users)
      },
      deleteUsers(id: number) {
        self.users?.splice(id, 1)
      },
    }
  })

const VoteCreate = VoteCreateModel.create({
  questions: [],
  isAnonim: false,
  title: '',
  description: '',
})

const SendCommentModel = t
  .model({
    userId: t.maybeNull(t.integer),
    voteId: t.maybeNull(t.integer),
    text: t.maybeNull(t.string),
    isRef: t.maybeNull(t.boolean),
    refComId: t.maybeNull(t.integer),
  })
  .actions((self) => {
    return {
      setUserId(value: number) {
        self.userId = value
      },
      setVoteId(value: number) {
        self.voteId = value
      },
      setText(value: string) {
        self.text = value
      },
      setRef(value: boolean) {
        self.isRef = value
      },
      setRefComId(value: number) {
        self.refComId = value
      },
    }
  })

const SendComment = SendCommentModel.create({
  text: '',
  isRef: false,
})

const rootStoreModel = t.model({
  VoteCreate: VoteCreateModel,
  selfUser: UserProfileModel,
  SendComment: SendCommentModel,
})

export type StoreType = Instance<typeof rootStoreModel>

export const CreateRootStore = (env: IEnv) => {
  return rootStoreModel.create(
    {
      VoteCreate,
      SendComment,
      selfUser,
    },
    env,
  )
}
