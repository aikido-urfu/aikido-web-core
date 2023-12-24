import axios from "axios";
import { GetVote, GetVoteById, PostVote } from "../types/api";
import { UserTypeGet } from "../models/userModel";

const a = axios.create({
  baseURL: 'http://venchass.ru:3005',
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzMzUwNDI5LCJleHAiOjE3MDU5NDI0Mjl9.WytT7HLBxBgofWwPvtSc9bybUkh-vH0YHGCUetiN4Go"
  }
})

export const API = {
  sendCreateVote(data: PostVote) {
    return a.post('/votes', data, {})
  },
  getVotes() {
    return a.get<{votes: GetVote[] }>("/votes")
  },
  getVote(id:number) {
    return a.get<GetVoteById>(`/votes/${id}`)
  },
  sendAnswers(answers: {[k: number]: Array<number>}, voteId: number) {
    return a.put(`/votes/${voteId}`, answers, {})
  },
  getUserByToken() {
    return a.get<UserTypeGet>('/users/me')
  }
}