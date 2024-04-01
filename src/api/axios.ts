import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  // GetMail,
  GetUsers,
  GetVote,
  GetVoteById,
  // PostMail,
  PostVote,
} from '../types/api'
import { UserTypeGet } from '../models/userModel'
// import { Cookies } from 'react-cookie'

const getCookie = (name: any) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  )

  console.log('cookie:')
  console.log(matches ? decodeURIComponent(matches[1]) : undefined)
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const a = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: 'Bearer ' + getCookie('user'),
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
  // sendMail(data: PostMail) {
  //   a.post('/mail', data, {
  //     headers: {
  //       ContentType: 'application/json',
  //     },
  //   })
  // },
  // getMail() {
  //   return a.get<GetMail>('/mail')
  // },
  // readMail(id: number) {
  //   return a.put(`/mail/${id}`, {})
  // },
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
