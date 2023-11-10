const blogRouter = require('express').Router()
const BlogPost = require('../models/blogPost')

// Get all blog posts

// blogRouter.get('/', (request, response) => {
//   BlogPost.find({}).then(blogPosts => {
//     response.json(blogPosts)
//   })
// })

blogRouter.get('/', async (request, response) => {
  const posts = await BlogPost.find({})
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

  const blogPost = new BlogPost({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
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

  //tirando try catch dps de instalar a lib express-async-errors
  await BlogPost.findByIdAndRemove(request.params.id)
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