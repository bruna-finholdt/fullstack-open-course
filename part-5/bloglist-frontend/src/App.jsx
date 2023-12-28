import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogPost, setBlogPost] = useState({
    title: '',
    author: '',
    url: '',
  })

  useEffect(() => {
    const getBlogPosts = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
  
    getBlogPosts();
  }, []);

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
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNewBlogPost = async (event) => {
    event.preventDefault()
    
    try {
      await blogService.post(blogPost)
      await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      ) 
      setBlogPost({
        title: '',
        author: '',
        url: '',
      })
    } catch (exception) {
      setErrorMessage('Teste')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const newblogPostForm = () => (
    <form onSubmit={handleNewBlogPost}>
      <div>
        title:
          <input
          type="text"
          value={blogPost.title}
          name="Title"
          onChange={({ target }) => setBlogPost({...blogPost, title: target.value})}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={blogPost.author}
          name="Author"
          onChange={({ target }) => setBlogPost({...blogPost, author: target.value})}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={blogPost.url}
          name="Url"
          onChange={({ target }) => setBlogPost({...blogPost, url: target.value})}
        />
      </div>
      <button type="submit">create</button>
    </form>   
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p> 
      <h2>create new</h2>
      {newblogPostForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App