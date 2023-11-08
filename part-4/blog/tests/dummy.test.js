const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogPosts = []

  const result = listHelper.dummy(blogPosts)
  expect(result).toBe(1)
})