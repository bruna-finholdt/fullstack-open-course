const blogRouter = require('express').Router()
const BlogPost = require('../models/blogPost')

// Get all blog posts
blogRouter.get('/', (request, response) => {
  BlogPost.find({}).then(blogPosts => {
    response.json(blogPosts)
  })
})

// blogRouter.get('/:id', (request, response, next) => {
//   BlogPost.findById(request.params.id)
//     .then(blogPost => {
//       if (blogPost) {
//         response.json(blogPost)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

// Create blog post
blogRouter.post('/', (request, response, next) => {
  const body = request.body

  const blogPost = new BlogPost({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blogPost.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

// blogRouter.delete('/:id', (request, response, next) => {
//   BlogPost.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// blogRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const blogPost = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes
//   }

//   BlogPost.findByIdAndUpdate(request.params.id, blogPost, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

module.exports = blogRouter