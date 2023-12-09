import { types } from "mobx-state-tree";

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
    name: types.string,
    description: types.string,
    multySelect: types.boolean,
    answer: types.array(AnswerModel),
    files: types.array(types.string)
})

const VoteCreateModel = types.model({
    name: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    isAnonim: types.maybeNull(types.boolean),
    users: types.maybeNull(types.array(UserModel)),
    question: types.maybeNull(types.array(QuestionModel)),
}).actions((self) => {
    return {
        setName(value: string){
            self.name = value
        },
        setDescription(value: string) {
            self.description = value
        },
        setAnonim(value: boolean) {
            self.isAnonim = value
        }
    }
})
const rootStoreModel = types.model({
    VoteCreate: VoteCreateModel
})

export const rootStore = rootStoreModel.create({
    VoteCreate: VoteCreateModel.create()
})
