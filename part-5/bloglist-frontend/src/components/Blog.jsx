import React, { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const Blog = ({ blog }) => {
  const { author, title, url, likes } = blog;
  const [visibleDetails, setVisibleDetails] = useState(false);
  const toggleDetails = () => {
    setVisibleDetails(!visibleDetails);
  };
  
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
          <span>{`likes ${likes}`}</span> <span><button>like</button></span>
          <div>{author}</div>
        </div>
      )}
    </div> 
)}

export default Blog