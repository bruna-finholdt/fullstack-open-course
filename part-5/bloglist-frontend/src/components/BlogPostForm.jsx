import React, { useState } from 'react'

const BlogPostForm = ({handleNewBlogPost}) => {
    const [blogPost, setBlogPost] = useState({
        title: '',
        author: '',
        url: '',
      });
      const handleTitleChange = (e) => {
        setBlogPost({ ...blogPost, title: e.target.value });
      };
    
      const handleAuthorChange = (e) => {
        setBlogPost({ ...blogPost, author: e.target.value });
      };
    
      const handleUrlChange = (e) => {
        setBlogPost({ ...blogPost, url: e.target.value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        handleNewBlogPost(blogPost);
        // Optionally, you can reset the form after submission
        setBlogPost({
          title: '',
          author: '',
          url: '',
        });
      };

  return (
    <>
    <div>create new</div>
    <form onSubmit={handleSubmit}>
      <div>
        title:
          <input
          type="text"
          value={blogPost.title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={blogPost.author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={blogPost.url}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>   
    </>
  )
}

export default BlogPostForm