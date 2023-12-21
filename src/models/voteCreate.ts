import { SnapshotOut, types } from "mobx-state-tree";
import { PostVote, Question } from "../types/api";

const UserModel = types.model({
    id: types.number,
    avatar: types.string,
    name: types.string,
    email: types.string
})

const AnswerModel = types.model({
    id: types.number,
    text: types.string,
})

const QuestionModel = types.model({
    title: types.string,
    description: types.string,
    isMultiply: types.boolean,
    isAnonimic: types.boolean,
    answers: types.array(types.string),
    files: types.array(types.string),
    photos: types.array(types.string),
    isHidenCounter: types.boolean,
})

const VoteCreateModel = types.model({
    title: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    isAnonim: types.maybeNull(types.boolean),
    users: types.maybeNull(types.array(UserModel)),
    questions: types.maybeNull(types.array(QuestionModel)),
    dateOfStart: types.maybeNull(types.string),
    dateOfEnd: types.maybeNull(types.string),
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
        }
    }
})
const rootStoreModel = types.model({
    VoteCreate: VoteCreateModel
})

export const rootStore = rootStoreModel.create({
    VoteCreate: VoteCreateModel.create({
        questions: [],
        isAnonim: false,
        title: '',
        description: '',
    })
})
