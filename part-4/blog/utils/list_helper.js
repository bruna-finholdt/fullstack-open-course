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
  })
  return favoriteBlogPost
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}