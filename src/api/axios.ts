import { string } from 'mobx-state-tree/dist/internal';
// import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  GetUsers,
  GetVote,
  GetVoteById,
  PostMessage,
  PostVote,
  GetMessages,
  GetTgToken,
} from '../types/api'
import { UserTypeGet } from '../models/userModel'
import { getCookie } from '../pages/helpers/cookie.helper'

export const COOKIE = getCookie('user')

type temp = {
  title: string
}

const a = axios.create({
  baseURL: 'http://51.250.78.241:3005',
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
  sendEditVote(id?: number, data?: temp) {
    return a.patch(`/votes/${id}`, data, {
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
  getTgToken() {
    return a.get<GetTgToken>('/telegram/token')
  },
  deleteVote(id?: number) {
    return a.delete(`/votes/${id}`)
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
