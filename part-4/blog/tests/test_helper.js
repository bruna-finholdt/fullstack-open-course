const BlogPost = require('../models/blogPost')

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

module.exports = {
  initialPosts, nonExistingId, postsInDb
}