import axios from 'axios'

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  validateStatus: function (status) {
    return status < 500 // Don't resolve status beyond 500
  },
  headers: { 'x-user-agent': 'Ananse' }
})
