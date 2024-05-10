// import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  GetUsers,
  GetVote,
  GetVoteById,
  PostMessage,
  PostVote,
  GetMessages,
} from '../types/api'
import { UserTypeGet } from '../models/userModel'
import { getCookie } from '../pages/helpers/cookie.helper'

export const COOKIE = getCookie('user')

const a = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: 'Bearer ' + COOKIE,
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
  sendComment(data: PostMessage) {
    return a.post('/messages', data, {
      headers: {
        ContentType: 'application/json',
      },
    })
  },
  getComments(id: number) {
    return a.get<{ messages: GetMessages[] }>(`/votes/${id}/messages`)
  },
  getVotes() {
    return a.get<{ votes: GetVote[] }>('/users/me/votes')
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
