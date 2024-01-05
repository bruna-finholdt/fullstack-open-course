import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogPostForm = ({ handleNewBlogPost }) => {
  const [blogPost, setBlogPost] = useState({
    title: '',
    author: '',
    url: '',
  })
  const handleTitleChange = (e) => {
    setBlogPost({ ...blogPost, title: e.target.value })
  }

  const handleAuthorChange = (e) => {
    setBlogPost({ ...blogPost, author: e.target.value })
  }

  const handleUrlChange = (e) => {
    setBlogPost({ ...blogPost, url: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    handleNewBlogPost(blogPost)
    setBlogPost({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <>
      <div>create new</div>
      <form onSubmit={handleSubmit}>
        <div>
        title:
          <input
            type="text"
            value={blogPost.title}
            id='title'
            name="Title"
            onChange={handleTitleChange}
            placeholder="title"
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={blogPost.author}
            id='author'
            name="Author"
            onChange={handleAuthorChange}
            placeholder="author"
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={blogPost.url}
            id='url'
            name="Url"
            onChange={handleUrlChange}
            placeholder="url"
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </>
  )
}

export default BlogPostForm

BlogPostForm.propTypes = {
  handleNewBlogPost: PropTypes.func.isRequired,
}