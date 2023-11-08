const average = require('../utils/for_testing').average

describe('average', () => {

  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  //This test reveals that the function does not work correctly with an empty array (this is because in JavaScript dividing by zero results in NaN):

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })

  //Fixing the function is quite easy: see the difference at utils/for_testing.js
  //Now it works, the test passes!

})

//Describe blocks can be used for grouping tests into logical collections.