import axios from 'axios'
const baseUrl = '/api/blogPosts'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  const blogs =  response.data
  if (blogs && blogs.length > 0) {
    const sortedBlogs = blogs.sort((a, b) => {
      if (a.likes > b.likes) return -1
      return 1
    })
    return sortedBlogs
  }
}

const post = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
  // return response.data
}

export default { getAll, post, setToken, update, remove }