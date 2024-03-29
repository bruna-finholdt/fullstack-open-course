import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {


  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            id='password'
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}