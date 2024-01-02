import React, { useState } from 'react';

const Blog = ({ blog, handleUpdateBlogPost, handleDeleteBlogPost, currentUser }) => {
  const { author, title, url, likes, user } = blog;
  const [visibleDetails, setVisibleDetails] = useState(false);
  const toggleDetails = () => {
    setVisibleDetails(!visibleDetails);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const confirmDelete = () => {
    const result = window.confirm(`Remove blog ${title} by ${author}`);

    if (result) {
      // If the user clicks OK in the confirmation dialog, proceed with the deletion
      handleDeleteBlogPost(blog.id);
    }
  }
  
  return (
    <div style={blogStyle}>
      <span>{title}</span>
      <span>
        <button onClick={toggleDetails}>
          {visibleDetails ? 'hide' : 'view'}
        </button>
      </span>
      {visibleDetails && (
        <div>
          <div>{url}</div>
          <span>{`likes ${likes}`}</span> <span><button onClick={() => handleUpdateBlogPost(blog)}>like</button></span>
          <div>{author}</div>
          <div>{user?.name || 'Unknown'}</div>
          {user && user.name === currentUser.name && (
            <button onClick={confirmDelete} style={{ backgroundColor: '#1b67e0' }}>
              remove
            </button>
          )}
        </div>
      )}
    </div> 
)}

export default Blog