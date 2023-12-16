import axios from "axios";
import { PostVote } from "../types/api";

const a = axios.create({
  baseURL: 'http://localhost:3000'
})

export const API = {
  sendCreateVote(data: PostVote) {
    return a.post('/votes', data, {})
  }
}