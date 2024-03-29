const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
// const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})


describe('when there is initially some users saved', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

  //     const passwordHash = await bcrypt.hash('sekret', 10)
  //     const user = new User({ username: 'root', passwordHash })

  //     await user.save()
  //   })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 10000)

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'julia',
      name: 'Julia Perez',
      password: '123456',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })


  test('fails with status code 400 if username is missing', async () => {

    const newUser = {
      password: 'password',
      name: 'Bruna Perez',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(helper.initialUsers.length)
  })

  test('fails with status code 400 if password is missing', async () => {

    const newUser = {
      username: 'julia',
      name: 'Julia Perez',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(helper.initialUsers.length)
  })

  test('fails with status code 400 if username has length < 3', async () => {

    const newUser = {
      username: 'ju',
      password: '123456789',
      name: 'Julia Perez',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(helper.initialUsers.length)
  })

  test('fails with status code 400 if password has length < 3', async () => {

    const newUser = {
      username: 'julia',
      password: '12',
      name: 'Julia Perez',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(helper.initialUsers.length)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})