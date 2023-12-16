type Question = {
  title: string;
  description: string;
  answers: string[];
  files: string[];
  photos: string[];
  isMultiply: boolean;
  isAnonimic: boolean;
  isHidenCounter: boolean;
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
