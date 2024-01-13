export type Question = {
  title: string
  description: string
  answers: string[]
  files: {
    file: string
    name: string
    type: string
  }[]
  photos: {
    file: string
    name: string
    type: string
  }[]
  isMultiply: boolean
}

export type PostVote = {
  title: string
  description: string
  dateOfStart: string
  dateOfEnd: string
  isAnonymous: boolean
  isActive: boolean
  isHidenCounter: boolean
  privateUsers: number[]
  files: string[]
  photos: string[]
  questions: Question[]
}

export type GetVote = PostVote & {
  id: number
}

export type GetVoteById = {
  id: number
  user: {
    id: number
    email: string
    password: string
    fullName: string
    phone?: string
    photo?: string
    telegram?: string
    telegramUserID?: string
  }
  isAdmin: string
  isVoted: boolean
  usersVoted: {
    id: number
    fullName: string
    photo: string
  }[]
  title: string
  description: string
  dateOfStart: string
  dateOfEnd: string
  creationDate: string
  isAnonymous: boolean
  isActive: boolean
  isHidenCounter: boolean
  privateUsers: number[]
  files: string[]
  photos: string[]
  questions: {
    id: number
    title: string
    description: string
    answers: {
      id: number
      text: string
      count: number
      users: {
        id: number
        fullName: string
        photo: string
      }[]
    }[]
    isAnonimic: boolean
    isHidenCounter: boolean
    files: string[]
    photos: string[]
    isMultiply: boolean
  }[]
}

export type GetUsers = {
  id: 0
  fullName: string
  phone: string
  photo: string
  telegram: string
}[]

export type PostMail = {
  theme: string
  receivers: number[]
  text: string
  files: {
    file: string
    name: string
    type: string
  }[]
  photos: {
    file: string
    name: string
    type: string
  }[]
}

export type GetMail = {
  id: number
  user: {
    id: number
    fullName: string
    email: string
    photo: string
  }
  isReaden: boolean
  date: string
  theme: string
  recievers: {
    name: string
    email: string
  }[]
  text: string
  files: string[]
  photos: string[]
}[]
