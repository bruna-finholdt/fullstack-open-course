const blogRouter = require('express').Router()
const BlogPost = require('../models/blogPost')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Get all blog posts

// blogRouter.get('/', (request, response) => {
//   BlogPost.find({}).then(blogPosts => {
//     response.json(blogPosts)
//   })
// })

blogRouter.get('/', async (request, response) => {
  const posts = await BlogPost.find({}).populate('user', { username: 1, name: 1 })
  response.json(posts)
})

//Get post by Id
blogRouter.get('/:id', async (request, response) => { //tiro o param next
//   BlogPost.findById(request.params.id)
//     .then(blogPost => {
//       if (blogPost) {
//         response.json(blogPost)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// }

  //colocando try catch
  // try {
  //   const blogPost = await BlogPost.findById(request.params.id)
  //   if (blogPost) {
  //     response.json(blogPost)
  //   } else {
  //     response.status(404).end()
  //   }
  // } catch(exception) {
  //   next(exception)
  // }

  //tirando try catch dps de instalar a lib express-async-errors
  const blogPost = await BlogPost.findById(request.params.id)
  if (blogPost) {
    response.json(blogPost)
  } else {
    response.status(404).end()
  }
})

// Create blog post
blogRouter.post('/', async (request, response) => { //tiro o param next
  const body = request.body
  // const user = await User.findById(body.user)

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const blogPost = new BlogPost({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  // blogPost.save()
  //   .then(savedPost => {
  //     response.status(201).json(savedPost)
  //     response.json(savedPost)
  //   })
  //   .catch(error => next(error))

  //colocando try catch

  // try {
  //   const savedPost = await blogPost.save()
  //   response.status(201).json(savedPost)
  // } catch(exception) {
  //   next(exception)
  // }

  //tirando try catch dps de instalar a lib express-async-errors
  const savedPost = await blogPost.save()
  user.blogPosts = user.blogPosts.concat(savedPost._id)
  await user.save()
  response.status(201).json(savedPost)
})

//Delete post
blogRouter.delete('/:id', async (request, response) => { //tiro o param next
  // BlogPost.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))

  //colocando try catch

  // try {
  //   await BlogPost.findByIdAndRemove(request.params.id)
  //   response.status(204).end()
  // } catch(exception) {
  //   next(exception)
  // }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await BlogPost.findById(request.params.id)
  const userFromBlog = blog.user.toString()

  if(userFromBlog === user._id.toString())
  //tirando try catch dps de instalar a lib express-async-errors
    await BlogPost.findByIdAndDelete(request.params.id)
  response.status(204).end()
  //Because of the library, we do not need the next(exception) call anymore. The library handles everything under the hood. If an exception occurs in an async route, the execution is automatically passed to the error handling middleware.
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blogPost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  // BlogPost.findByIdAndUpdate(request.params.id, blogPost, { new: true })
  //   .then(updatedNote => {
  //     response.json(updatedNote)
  //   })
  //   .catch(error => next(error))

  const updatedPost = await BlogPost.findByIdAndUpdate(request.params.id, blogPost, { new: true })
  response.status(200).json(updatedPost)
})

module.exports = blogRouter