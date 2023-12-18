import axios from "axios";
import { GetVote, GetVoteById, PostVote } from "../types/api";

const a = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNzQzODg0LCJleHAiOjE3MDUzMzU4ODR9.bdgEGBDoAeY-FR0fY5XjAGuHPCsrh4B7W1GHF2x4Jh8"
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
  }
}