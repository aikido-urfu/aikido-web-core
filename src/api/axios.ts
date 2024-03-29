import axios from 'axios'
import {
  GetMail,
  GetUsers,
  GetVote,
  GetVoteById,
  PostMail,
  PostVote,
} from '../types/api'
import { UserTypeGet } from '../models/userModel'

const a = axios.create({
  baseURL: 'http://venchass.ru:3005',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA1MjQwNTIxLCJleHAiOjE3MDc4MzI1MjF9.ytCJ9hDucbH1JwJUnwv5aluIjdgNv6vU7mv_1PYBD4E',
  },
})

export const API = {
  sendCreateVote(data: PostVote) {
    return a.post('/votes', data, {
      headers: {
        ContentType: 'application/json',
      },
    })
  },
  getVotes() {
    return a.get<{ votes: GetVote[] }>('/votes')
  },
  getVote(id: number) {
    return a.get<GetVoteById>(`/votes/${id}`)
  },
  sendAnswers(answers: { [k: number]: Array<number> }, voteId: number) {
    return a.put(`/votes/${voteId}`, answers, {})
  },
  getUserByToken() {
    return a.get<UserTypeGet>('/users/me')
  },
  getUsersAll() {
    return a.get<GetUsers>('/users')
  },
  sendMail(data: PostMail) {
    a.post('/mail', data, {
      headers: {
        ContentType: 'application/json',
      },
    })
  },
  getMail() {
    return a.get<GetMail>('/mail')
  },
  readMail(id: number) {
    return a.put(`/mail/${id}`, {})
  },
  uploadPhoto(file: File) {
    const formData = new FormData()
    formData.append('photo', file)

    return a.post<{ url: string }>('/files/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
