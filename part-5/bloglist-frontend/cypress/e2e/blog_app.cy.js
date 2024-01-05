describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Dart',
      username: 'dart',
      password: 'bla123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  // it('login form can be opened', function() {
  //   cy.contains('login').click()
  // })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('dart')
      cy.get('#password').type('bla123')
      cy.get('#login-button').click()
      cy.contains('Dart logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('dart')
      cy.get('#password').type('bla12')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)') //more simple
      // cy.get('error').should('contain', 'wrong credentials') //more options
      cy.get('html').should('not.contain', 'Dart logged in')
      cy.contains('Dart logged in').should('not.exist')
    })

  })

  describe('when logged in', function() {
    beforeEach(function() {
      // cy.contains('login').click()
      // cy.get('#username').type('dart')
      // cy.get('#password').type('bla123')
      // cy.get('#login-button').click()
      // cy.request('POST', 'http://localhost:3001/api/login', {
      //   username: 'dart', password: 'bla123'
      // }).then(response => {
      //   localStorage.setItem('loggedBlogPostappUser', JSON.stringify(response.body))
      //   cy.visit('http://localhost:5173')
      // })
      cy.login({ username: 'dart', password: 'bla123' })
    })


    it('a new blog post can be created', function() {
      cy.contains('create new blog').click()
      // cy.get('#title').type('new blog post title')
      // cy.get('#author').type('new blog post author')
      // cy.get('#url').type('www.test.com')
      // cy.wait(1000) // Wait for 1 second (adjust as needed)
      // cy.get('#create-button').click()

      cy.handleNewBlogPost({
        title: 'another blog post',
        author: 'another author',
        url: 'www.anotherurl.com'
      })

      cy.contains('another blog post')
    })


    it('blogs are ordered by likes', function() {
      cy.contains('create new blog').click()
      cy.handleNewBlogPost({
        title: 'blog post with most likes',
        author: 'author 1',
        url: 'www.mostlikes.com'
      })
      cy.contains('blog post with most likes')

      cy.contains('create new blog').click()
      cy.handleNewBlogPost({
        title: 'blog post with fewer likes',
        author: 'author 2',
        url: 'www.fewerlikes.com'
      })

      cy.contains('blog post with fewer likes')

      cy.visit('')

      cy.contains('blog post with most likes').contains('view').click()
      cy.get('.like-button').click()
      cy.get('.like-button').click()
      cy.get('.like-button').click()
      cy.contains('hide').click()


      cy.contains('blog post with fewer likes').contains('view').click()
      cy.get('.like-button').click()

      cy.contains('hide').click()

      cy.get('.blog').eq(0).should('contain', 'blog post with most likes')
      cy.get('.blog').eq(1).should('contain', 'blog post with fewer likes')
    })


    describe('and several blog posts exist', function () {
      beforeEach(function () {
        cy.handleNewBlogPost({
          title: 'first blog post',
          author: 'first author',
          url: 'www.firsturl.com'
        })
        cy.handleNewBlogPost({
          title: 'second blog post',
          author: 'second author',
          url: 'www.secondurl.com'
        })
        cy.handleNewBlogPost({
          title: 'third blog post',
          author: 'third author',
          url: 'www.thirdurl.com'
        })
      })

      it('users can like a blog post', function () {
        cy.contains('second blog post')
          .contains('view')
          .click()
        cy.contains('likes 0').parent().find('.like-button').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('likes 1')
      })

      it('the user who created a blog post can delete it', function () {
        cy.contains('second blog post')
          .contains('view')
          .click()
        cy.contains('title: second blog post').parent().find('.delete-button').as('deleteButton')
        cy.get('@deleteButton').click()
        cy.contains('title: second blog post').should('not.exist')
      })

      it('user who did not create a blog can\'t delete it, because user cant see remove button', function () {
        const user = {
          name: 'Bruna',
          username: 'bruna',
          password: 'bla123'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
        cy.login({ username: 'bruna', password: 'bla123' })
        cy.contains('second blog post')
          .contains('view')
          .click()
        cy.contains('.delete-button').should('not.exist')
      })




    })


  })



})
