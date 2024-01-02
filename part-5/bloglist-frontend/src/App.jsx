import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogPostForm from './components/BlogPostForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [notifType, setNotifType] = useState('')
  const blogPostFormRef = useRef()

  useEffect(() => {
    const getBlogPosts = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    getBlogPosts()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogPostappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogPostappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      // console.error(error);
      setNotifType('error')
      setMessage(error.response.data.error)
      setUsername('')
      setPassword('')
    }
  }

  const handleNewBlogPost = async (newBlogPost) => {
    try {
      blogPostFormRef.current.toggleVisibility()
      await blogService.post(newBlogPost)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotifType('success')
      setMessage(`A new blog post ${newBlogPost.title} by ${newBlogPost.author} added`)
    } catch (error) {
      console.error('Error creating a new blog post:', error)

      if (error.response && error.response.data) {
        setNotifType('error')
        setMessage(error.response.data.error || 'An error occurred while creating a new blog post.')
      } else {
        setNotifType('error')
        setMessage('An unexpected error occurred while creating a new blog post.')
      }
    }
  }

  const handleUpdateBlogPost = async (blogPost) => {
    const updatedLikes = {
      ...blogPost,
      likes: blogPost.likes + 1
    }
    try {
      await blogService.update(blogPost.id, updatedLikes)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotifType('success')
      setMessage('The blog post was successfully updated')
    } catch (error) {
      console.error('Error updating a blog post:', error)

      if (error.response && error.response.data) {
        setNotifType('error')
        setMessage(error.response.data.error || 'An error occurred while creating a new blog post.')
      } else {
        setNotifType('error')
        setMessage('An unexpected error occurred while creating a new blog post.')
      }
    }
  }

  const handleDeleteBlogPost = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotifType('success')
      setMessage('The blog post was successfully deleted')
    } catch (error) {
      console.error('Error deleting a blog post:', error)

      if (error.response && error.response.data) {
        setNotifType('error')
        setMessage(error.response.data.error || 'An error occurred while creating a new blog post.')
      } else {
        setNotifType('error')
        setMessage('An unexpected error occurred while creating a new blog post.')
      }
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} setMessage={setMessage} notifType={notifType} setNotifType={setNotifType}/>
        <Togglable buttonLabel='login'>
          <LoginForm username={username} password={password} handleLogin={handleLogin} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange}/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} setMessage={setMessage} notifType={notifType} setNotifType={setNotifType}/>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogPostFormRef}>
        <BlogPostForm handleNewBlogPost={handleNewBlogPost} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateBlogPost={handleUpdateBlogPost} handleDeleteBlogPost={handleDeleteBlogPost} currentUser ={user}/>
      )}
    </div>
  )
}

export default App