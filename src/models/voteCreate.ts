import { Instance, SnapshotOut, types as t } from "mobx-state-tree";
import { PostVote, Question } from "../types/api";
import { UserProfileModel, selfUser } from "./userModel";
import { IEnv } from "../App";

const UserModel = t.model({
    id: t.number,
    avatar: t.string,
    name: t.string,
    email: t.string
})

const AnswerModel = t.model({
    id: t.number,
    text: t.string,
})
const files = t.model({
    file: t.string,
    name: t.string,
    type: t.string
})
const QuestionModel = t.model({
    title: t.string,
    description: t.string,
    isMultiply: t.boolean,
    isAnonimic: t.boolean,
    answers: t.array(t.string),
    files: t.array(files),
    photos: t.array(files),
    isHidenCounter: t.boolean,
})

const VoteCreateModel = t.model({
    title: t.maybeNull(t.string),
    description: t.maybeNull(t.string),
    isAnonim: t.maybeNull(t.boolean),
    users: t.maybeNull(t.array(UserModel)),
    questions: t.maybeNull(t.array(QuestionModel)),
    dateOfStart: t.maybeNull(t.string),
    dateOfEnd: t.maybeNull(t.string),
}).actions((self) => {
    return {
        setName(value: string){
            self.title = value
        },
        setDescription(value: string) {
            self.description = value
        },
        setAnonim(value: boolean) {
            self.isAnonim = value
        },
        seneCreateVote(data: PostVote) {
            
        },
        addQuestion(question: Question) {
            self.questions.push(QuestionModel.create({
                title: question.title,
                description: question.description,
                answers: question.answers,
                files: question.files,
                photos: question.photos,
                isMultiply: question.isMultiply,
                isAnonimic: false,
                isHidenCounter: false
            }))
        },
        setDate(d1: string, d2: string) {
            self.dateOfStart = d1
            self.dateOfEnd = d2
        },
        deleteQuestion(id: number) {
            self.questions.splice(id, 1)
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
    selfUser: UserProfileModel
})

export type StoreType = Instance<typeof rootStoreModel>

export const CreateRootStore = (env: IEnv) => {
    return rootStoreModel.create({
        VoteCreate,
        selfUser
    }, env)
}