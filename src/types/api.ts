export type Question = {
  title: string;
  description: string;
  answers: string[];
  files: {
    file: "string",
    name: "string",
    type: "string"
  }[],
  photos: {
    file: "string",
    name: "string",
    type: "string"
  }[]
  isMultiply: boolean;
};

export type PostVote = {
  title: string;
  description: string;
  dateOfStart: string;
  dateOfEnd: string;
  isAnonymous: boolean;
  isActive: boolean;
  isHidenCounter: boolean;
  privateUsers: number[];
  files: string[];
  photos: string[];
  questions: Question[];
};

export type GetVote = PostVote & {
  id: number
}

export type GetVoteById = {
  id: number;
  user: {
    id: number;
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    photo?: string;
    telegram?: string;
    telegramUserID?: string;
  },
  isAdmin: string;
  isVoted: boolean;
  votedUsers: {
    id: number;
    fullName: string;
    photo: string;
  }[];
  title: string;
  description: string;
  dateOfStart: string;
  dateOfEnd: string;
  creationDate: string;
  isAnonymous: boolean;
  isActive: boolean;
  isHidenCounter: boolean;
  privateUsers: number[];
  files: string[];
  photos: string[];
  questions: {
    id: number;
    title: string;
    description: string;
    answers: {
      id: number;
      text: string;
      count: number;
      votedUsers: {
        id: number;
        fullName: string;
        photo: string;
      }[];
    }[];
    isAnonimic: boolean;
    isHidenCounter: boolean;
    files: string[];
    photos: string[];
    isMultiply: boolean;
  }[];
}

