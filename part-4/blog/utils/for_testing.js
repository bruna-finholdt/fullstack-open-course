const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

//changed this function from this:

// const average = (array) => {
//   const reducer = (sum, item) => {
//     return sum + item
//   }

//   return array.reduce(reducer, 0) / array.length
// }

//to this: (to fix tests with empty arrays)

const average = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

//same:

// const array = []

// const average = array.reduce((sum, item) => {
//   return sum + item / array.length
// }, 0)

module.exports = {
  reverse,
  average,
}