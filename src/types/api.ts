export type Question = {
  title: string
  description: string
  answers: string[]
  files: {
    file: string
    name: string
    type: string
  }[]
  photos: string[]
  isMultiply: boolean
}

export type PostVote = {
  title: string
  description: string
  startDate: string
  endDate: string
  isAnonymous: boolean
  isActive: boolean
  isVoted: boolean
  isHidenCounter: boolean
  files: string[]
  photos: string[]
  questions: Question[]
  respondents: number[]
}

export type GetVote = PostVote & {
  id: number
  usersVoted: {
    id: number
    fullName: string
    photo: string
  }[]
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
  startDate: string
  endDate: string
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
  respondents: number[]
}

export type GetUsers = {
  id: 0
  fullName: string
  phone: string
  photo: string
  telegram: string
}[]

export type PostMessage = {
  userId: number
  voteId: number
  text: string
  isRef: boolean
  refComId?: number
}

export type GetMessages = {
  id: number
  text: string
  creationDate: string
  userId: number
  userName: string
  isRef: false
  refComId?: number
  refUserId?: number
  refUserName?: string
}[]

export type GetTgToken = {
  token: string
}

// export type GetMessage = GetMessages &
//   {
//     id: number
//   }[]
