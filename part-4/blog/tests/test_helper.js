const BlogPost = require('../models/blogPost')
const User = require('../models/user')

const initialPosts = [
  {
    title: 'Teste',
    author: 'teste',
    url: 'https://www.youtube.com/',
    likes: 10
  },
  {
    title: 'Teste2',
    author: 'teste2',
    url: 'https://www.youtube.com/',
    likes: 5
  },
]

const nonExistingId = async () => {
  const post = new BlogPost({ title: 'Teste', author: 'teste',
    url: 'https://www.youtube.com/',
    likes: 5 })
  await post.save()
  await post.deleteOne()

  return post._id.toString()
}

const postsInDb = async () => {
  const posts = await BlogPost.find({})
  return posts.map(post => post.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialUsers = [
  {
    username: 'julia',
    password: '123456',
    name: 'Julia Perez',
  },
  {
    username: 'dart',
    password: '123456',
    name: 'Dartagnan Perez',
  },
  {
    username: 'hally',
    password: '123456',
    name: 'Hallyna Perez',
  },
]

module.exports = {
  initialPosts,
  nonExistingId,
  postsInDb,
  usersInDb,
  initialUsers,
}