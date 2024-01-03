import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('blog component', () => {

  let component
  const blog = {
    author: 'Author',
    title: 'Title',
    likes: 10,
    url: 'www.test.com',
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  test('renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {

    expect(component.container).toHaveTextContent('Title')
    expect(component.container).toHaveTextContent('Author')
    expect(component.container).not.toHaveTextContent('10')
    expect(component.container).not.toHaveTextContent('www.test.com')
  })

  test('after clicking the view button, URL and number of likes are shown', async () => {
    const toggleButton = component.getByText('view')
    fireEvent.click(toggleButton)

    expect(component.container).toHaveTextContent('10')
    expect(component.container).toHaveTextContent('www.test.com')
  })
})

