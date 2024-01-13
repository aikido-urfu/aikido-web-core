import axios from "axios";
import { GetUsers, GetVote, GetVoteById, PostMail, PostVote } from "../types/api";
import { UserTypeGet } from "../models/userModel";

const a = axios.create({
  baseURL: 'http://venchass.ru:3005',
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1MDc5MDgwLCJleHAiOjE3MDc2NzEwODB9.eFWg-XUd1Wb0L3w4QmCyV8XwlDgTg-gOI8VEmKkS0dc"
  }
})

export const API = {
  sendCreateVote(data: PostVote) {
    return a.post('/votes', data, { headers: {
      ContentType: 'application/json'
    }})
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
  },
  getUsersAll() {
    return a.get<GetUsers>('/users')
  },
  sendMail(data: PostMail) {
    a.post('/mail', data, { headers: {
      ContentType: 'application/json'
    }})
  }
}