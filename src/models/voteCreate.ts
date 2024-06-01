import { Instance, types as t, cast } from 'mobx-state-tree'
import { Question, PostFiles } from '../types/api'
import { UserProfileModel, selfUser } from './userModel'
import { IEnv } from '../App'
// import { FileModelType } from '../pages/VoteCreate/FirstStep'
import { UploadFile } from 'antd'
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

const DocumentModel = t.model({
  name: t.string,
  url: t.string,
  type: t.string,
  id: t.number,
})

const VoteCreateModel = t
  .model({
    title: t.maybeNull(t.string),
    description: t.maybeNull(t.string),
    isAnonim: t.maybeNull(t.boolean),
    users: t.maybeNull(t.array(t.integer)),
    groups: t.maybeNull(t.array(t.integer)),
    questions: t.maybeNull(t.array(QuestionModel)),
    startDate: t.maybeNull(t.string),
    endDate: t.maybeNull(t.string),
    documents: t.maybeNull(t.array(DocumentModel)),
    // documentsFiles: t.maybeNull(t.array(DocumentFileModel)),
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
      addDocument(file: PostFiles) {
        self.documents?.push(
          DocumentModel.create({
            name: file.name,
            url: file.url,
            type: file.type,
            id: file.id,
          }),
        )
      },
      // addDocumentFile(file: any) {
      //   file.forEach((x: any, index: number) => {
      //     self.documentsFiles?.push(
      //       DocumentFileModel.create({
      //         id: file[index],
      //         uid: file[index].uid,
      //         lastModified: file[index].lastModified,
      //         lastModifiedDate: file[index].lastModifiedDate,
      //         name: file[index].name,
      //         size: file[index].size,
      //         type: file[index].type,
      //         webkitRelativePath: file[index].webkitRelativePath,
      //       }),
      //     )
      //   })
      // },
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
      setUsers(users: number[]) {
        self.users = cast(users)
      },
      setGroups(groups: number[]) {
        self.groups = cast(groups)
      },
      deleteName() {
        self.title = null
      },
      deleteDescription() {
        self.description = null
      },
      deleteAnonim() {
        self.isAnonim = null
      },
      deleteDate() {
        self.startDate = null
        self.endDate = null
      },
      deleteQuestion(id: number) {
        self.questions?.splice(id, 1)
      },
      deleteDocument(id: number) {
        self.documents?.splice(id, 1)
      },
      deleteFiles(id: number) {
        self.questions?.splice(id, 1)
      },
      deleteAllQuestions() {
        self.questions?.splice(0, self.questions?.length)
      },
      deleteAllDocuments() {
        self.documents?.splice(0, self.documents?.length)
      },
      deleteUsers(id: number) {
        self.users?.splice(id, 1)
      },
      deleteGroups(id: number) {
        self.groups?.splice(id, 1)
      },
      deleteAllGroups() {
        self.groups?.splice(0, self.groups?.length)
      },
      deleteAllUsers() {
        self.users?.splice(0, self.users?.length)
      },
    }
  })

const VoteCreate = VoteCreateModel.create({
  title: '',
  description: '',
  isAnonim: false,
  questions: [],
  documents: [],
  // documentsFiles: [],
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
