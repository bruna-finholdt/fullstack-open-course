const { groupBy, maxBy } = require('lodash')

const dummy = (blogPosts) => {
  const result = blogPosts.length - blogPosts.length + 1
  return result
}

const totalLikes = (blogPosts) => {
  const likes = blogPosts.reduce((likesSum, blogPosts) => {
    return likesSum + blogPosts.likes
  }, 0)

  return blogPosts.length === 0
    ? 0
    : likes
}

const favoriteBlog = (blogPosts) => {
  const favoriteBlogPost = blogPosts.reduce((previousBlogPost, currentBlogPost) => {
    return previousBlogPost.likes > currentBlogPost.likes ? previousBlogPost : currentBlogPost
  }, {})
  return favoriteBlogPost
}

const mostBlogs = (blogPosts) => {
  const blogsByAuthor = groupBy(blogPosts, 'author')
  console.log('blogsByAuthor', blogsByAuthor)
  //A função maxBy espera um array de objetos e um campo pelo qual deve encontrar o valor máximo. No entanto, você está passando blogsByAuthor, que é um objeto, não um array, para maxBy. É por isso que você está recebendo undefined. Para encontrar o autor com mais posts, você deve transformar o objeto blogsByAuthor em um array de objetos (um objeto para cada autor) antes de usar maxBy. Você pode fazer isso usando Object.entries para obter as entradas do objeto e, em seguida, mapear essas entradas para um formato que maxBy possa usar.
  const authorPostsArray = Object.entries(blogsByAuthor).map(([author, posts]) => ({ author, blogs: posts.length }))
  console.log('authorPostsArray', authorPostsArray)
  const authorWithMostPosts = maxBy(authorPostsArray, 'blogs')
  console.log('authorWithMostPosts', authorWithMostPosts)
  return authorWithMostPosts ? authorWithMostPosts : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}