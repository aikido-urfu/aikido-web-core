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

export type File = {
  id: number
  name: string
  type: string
}

export type User = {
  id: number
  email: string
  password: string
  fullName: string
  role: string
  phone: string
  photo: string
  telegramUserID: string
}

export type PostFiles = File & {
  url: string
}

export type PostVote = {
  title: string
  description: string
  startDate: string
  endDate: string
  isAnonymous: boolean
  isEnding: boolean
  isVoted: boolean
  isHidenCounter: boolean
  files: number[]
  photos: string[]
  questions: Question[]
  respondents: number[]
  groups: number[]
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
  isEnding: boolean
  isHidenCounter: boolean
  privateUsers: number[]
  files: PostFiles[]
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
    files: number[]
    photos: string[]
    isMultiply: boolean
  }[]
  respondents: User[]
  attachedGroups: {
    id: number
    name: string
    users: {
      fullName: string
      id: number
      photo: null
      role: string
    }[]
  }[]
}

export type GetUsers = {
  id: 0
  fullName: string
  phone: string
  photo: string
  telegramUserID: string
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
  references: {
    creationDate: string
    id: number
    isRef: true
    refComId: number
    refUserId: number
    refUserName: string
    references: any[]
    text: string
    userId: number
    userName: string
  }[]
}[]

export type GetTgToken = {
  token: string
}

export type GetGroups = {
  id: number
  name: string
  users: {
    id: number
    email: string
    password: string
    fullName: string
    role: string
    phone: null
    photo: null
    telegramUserID?: null | string
  }[]
}

export type GetUserById = {
  id: number
  fullName: string
  role: string
  photo?: null
  phone?: null
  emaiL: string
  telegramUserID?: null | string
}

// export type GetMessage = GetMessages &
//   {
//     id: number
//   }[]
