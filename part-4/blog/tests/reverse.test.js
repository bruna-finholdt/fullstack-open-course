const reverse = require('../utils/for_testing').reverse

//The first parameter of the function is the test description as a string. The second parameter is a function, that defines the functionality for the test case:

//Since in these test cases we are comparing two strings, we can use the toBe matcher.

test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
  const result = reverse('releveler')

  expect(result).toBe('releveler')
})

//to see the error message in the console:

// test('palindrome of react', () => {
//   const result = reverse('react')

//   expect(result).toBe('tkaer') //wrong
// })



