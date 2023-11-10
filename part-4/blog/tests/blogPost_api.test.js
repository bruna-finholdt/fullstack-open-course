const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
//The test imports the Express application from the app.js module and wraps it with the supertest function into a so-called superagent object. This object is assigned to the api variable and tests can use it for making HTTP requests to the backend.
const app = require('../app')

const api = supertest(app)

const BlogPost = require('../models/blogPost')

//Let's initialize the database before every test with the beforeEach function:

//initialPosts foi para o test_helper!
// const initialPosts = [
//   {
//     title: 'Teste',
//     author: 'teste',
//     url: 'https://www.youtube.com/',
//     likes: 10
//   },
//   {
//     title: 'Teste2',
//     author: 'teste2',
//     url: 'https://www.youtube.com/',
//     likes: 5
//   },
// ]

//The database is cleared out at the beginning, and after that, we save the two notes stored in the initialNotes array to the database. By doing this, we ensure that the database is in the same state before every test is run:

//Optimizing the beforeEach function:
//from this:
// beforeEach(async () => {
//   await BlogPost.deleteMany({})
//   let noteObject = new BlogPost(helper.initialPosts[0])
//   await noteObject.save()
//   noteObject = new BlogPost(helper.initialPosts[1])
//   await noteObject.save()
// })

//to this:
// beforeEach(async () => {
//   await BlogPost.deleteMany({})
//   const postObjects = helper.initialPosts.map(blogPost => new BlogPost(blogPost))
//   const promiseArray = postObjects.map(blogPost => blogPost.save())
//   await Promise.all(promiseArray)
// })

//or this:
beforeEach(async () => {
  await BlogPost.deleteMany({})

  for (let blogPost of helper.initialPosts) {
    let postObject = new BlogPost(blogPost)
    await postObject.save()
  }
})

//Our test makes an HTTP GET request to the api/blogPosts url and verifies that the request is responded to with the status code 200. The test also verifies that the Content-Type header is set to application/json, indicating that the data is in the desired format.

test('blog posts are returned as json', async () => {
  await api
    .get('/api/blogPosts')
    .expect(200)
    .expect('Content-Type', /application\/json/) //The desired value is now defined as regular expression or in short regex. The regex starts and ends with a slash /, because the desired string application/json also contains the same slash, it is preceded by a \ so that it is not interpreted as a regex termination character.

  //In principle, the test could also have been defined as a string

  //.expect('Content-Type', 'application/json')
  //The problem here, however, is that when using a string, the value of the header must be exactly the same. For the regex we defined, it is acceptable that the header contains the string in question. The actual value of the header is application/json; charset=utf-8, i.e. it also contains information about character encoding. However, our test is not interested in this and therefore it is better to define the test as a regex instead of an exact string.
}, 100000) //3 param***

//The test contains some details that we will explore a bit later on. The arrow function that defines the test is preceded by the async keyword and the method call for the api object is preceded by the await keyword. We will write a few tests and then take a closer look at this async/await magic.

// test('there are four posts', async () => {
//   const response = await api.get('/api/blogPosts')

//   expect(response.body).toHaveLength(4)
// })

// test('the first post has the title Teste', async () => {
//   const response = await api.get('/api/blogPosts')

//   expect(response.body[0].title).toBe('Teste')
// })

//GET test
test('the correct amount of blog posts is returned', async () => {
  const response = await api.get('/api/blogPosts')
  expect(response.body).toHaveLength(helper.initialPosts.length)
})

//unique identifier property of the blog posts is named id
test('blog post has id property', async () => {
  const response = await api.get('/api/blogPosts')
  const blogPost = response.body[0]

  expect(blogPost.id).toBeDefined()
})

// test('a specific post title is within the returned posts', async () => {
//   const response = await api.get('/api/blogPosts')
//   const titles = response.body.map(r => r.title)
//   expect(titles).toContain('Teste')
// })

//POST test
test('a post can be successfully created', async () => {
  const newBlogPost = {
    title: 'Teste3',
    author: 'teste3',
    url: 'https://www.youtube.com/',
    likes: 5,
  }

  await api
    .post('/api/blogPosts')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  //   const response = await api.get('/api/blogPosts')
  //   const titles = response.body.map(r => r.title)
  //   console.log(titles)
  //   console.log(initialPosts.length)
  //   expect(response.body).toHaveLength(initialPosts.length + 1)
  //   expect(titles).toContain('Teste3')
  const postsAtEnd = await helper.postsInDb()
  expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1)
  const titles = postsAtEnd.map(n => n.title)
  expect(titles).toContain('Teste3')
})

//field (likes) is set to zero as a default value if not filled
test('missing likes property defaults to 0', async () => {
  const newBlogPost = {
    title: 'Teste4',
    author: 'teste4',
    url: 'https://www.youtube.com/',
  }

  await api
    .post('/api/blogPosts')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogPosts')
  const savedPost = response.body.find(blog => blog.title === 'Teste4')

  expect(savedPost.likes).toBeDefined()
  expect(savedPost.likes).toBe(0)
})

//field (title) is required error test
test('post without title is not added', async () => {
  const newBlogPost = {
    author: 'teste5',
    url: 'https://www.youtube.com/',
    likes: 5,
  }

  await api
    .post('/api/blogPosts')
    .send(newBlogPost)
    .expect(400)
  //   const response = await api.get('/api/blogPosts')
  //   expect(response.body).toHaveLength(initialPosts.length)
  const postsAtEnd = await helper.postsInDb()
  expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
})

//field (url) is required error test
test('post without url is not added', async () => {
  const newBlogPost = {
    title: 'Teste6',
    author: 'teste6',
    likes: 5,
  }

  await api
    .post('/api/blogPosts')
    .send(newBlogPost)
    .expect(400)
    //   const response = await api.get('/api/blogPosts')
    //   expect(response.body).toHaveLength(initialPosts.length)
  const postsAtEnd = await helper.postsInDb()
  expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
})

// //GET BY ID test
// test('a specific post can be viewed', async () => {
//   const postsAtStart = await helper.postsInDb()

//   const postToView = postsAtStart[0] //é pra pegar o primeiro post da lista

//   const resultPost = await api
//     .get(`/api/blogPosts/${postToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   expect(resultPost.body).toEqual(postToView)
// })

// //DELETE test
// test('a post can be deleted', async () => {
//   const postsAtStart = await helper.postsInDb()
//   const postToDelete = postsAtStart[0] //é pra deletar o primeiro post da lista

//   await api
//     .delete(`/api/blogPosts/${postToDelete.id}`)
//     .expect(204)

//   const postsAtEnd = await helper.postsInDb()

//   expect(postsAtEnd).toHaveLength(
//     helper.initialPosts.length - 1
//   )

//   const titles = postsAtEnd.map(r => r.title)

//   expect(titles).not.toContain(postToDelete.title)
// })

//Once all the tests (there is currently only one) have finished running we have to close the database connection used by Mongoose. This can be easily achieved with the afterAll method:

afterAll(async () => {
  await mongoose.connection.close()
})

//I ran npm test and all tests passed, however I got this warning:
//Jest did not exit one second after the test run has completed.
//'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.

//The problem is quite likely caused by the Mongoose version 6.x, the problem does not appear when version 5.x or 7.x is used. Mongoose documentation does not recommend testing Mongoose applications with Jest.

//One way to get rid of this is to add to the directory tests a file teardown.js with the following content:

// module.exports = () => {
//   process.exit(0)
// }

//did it.

//and by extending the Jest definitions in the package.json as follows

// {
//     //...
//     "jest": {
//       "testEnvironment": "node",
//       "globalTeardown": "./tests/teardown.js" <-
//     }
// }

// Another error you may come across is your test takes longer than the default Jest test timeout of 5000 ms. This can be solved by adding a third parameter to the test function: I added the 3 param up in the test (above) (***)

//This third parameter sets the timeout to 100000 ms. A long timeout ensures that our test won't fail due to the time it takes to run. (A long timeout may not be what you want for tests based on performance or speed, but this is fine for our example tests).