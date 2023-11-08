const dummy = (blogPosts) => {
  const result = blogPosts.length - blogPosts.length + 1
  return result
}

const totalLikes = (blogPosts) => {
  const reducer = (likesSum, blogPosts) => {
    return likesSum + blogPosts.likes
  }

  return blogPosts.length === 0
    ? 0
    : blogPosts.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}