import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogPostForm from './BlogPostForm'
import userEvent from '@testing-library/user-event'

test('<BlogPostForm /> updates parent state and calls onSubmit', async () => {
  const handleNewBlogPost = jest.fn()
  const user = userEvent.setup()

  render(<BlogPostForm handleNewBlogPost={handleNewBlogPost} />)

  const input = screen.getByPlaceholderText('title')
  const sendButton = screen.getByText('create')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(handleNewBlogPost.mock.calls).toHaveLength(1)
  expect(handleNewBlogPost.mock.calls[0][0].title).toBe('testing a form...')
})