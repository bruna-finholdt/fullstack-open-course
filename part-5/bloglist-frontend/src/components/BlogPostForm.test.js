import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogPostForm from './BlogPostForm'
import userEvent from '@testing-library/user-event'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const handleNewBlogPost = jest.fn()
  const user = userEvent.setup()

  render(<BlogPostForm handleNewBlogPost={handleNewBlogPost} />)

  const input = screen.getByPlaceholderText('title')
  const input2 = screen.getByPlaceholderText('author')
  const input3 = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(input, 'Title')
  await user.type(input2, 'Author')
  await user.type(input3, 'www.test.com')
  await user.click(sendButton)

  expect(handleNewBlogPost.mock.calls).toHaveLength(1)
  expect(handleNewBlogPost.mock.calls[0][0].title).toBe('Title')
  expect(handleNewBlogPost.mock.calls[0][0].author).toBe('Author')
  expect(handleNewBlogPost.mock.calls[0][0].url).toBe('www.test.com')
})