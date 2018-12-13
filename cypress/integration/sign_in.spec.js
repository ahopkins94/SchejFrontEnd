describe('Signing in', () => {
  var stub

  before(() => {
    stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('http://localhost:3000/')
    cy.server()
    const data = {
      name: 'TestName'
    }
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_in',
      response: data
    })

    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shifts?organisation=Testorganisation',
      response: []
    })
  })

  it('Redirects to shifts page and welcomes user after signing in', () => {
    cy.get('[id="sign-in-email-entry"]')
      .type('TestName')
    cy.get('[id="sign-in-password-entry"]')
      .type('TestPassword')
    cy.get('[id="sign-in-submit"]')
      .click()

    cy.url().should('eq', 'http://localhost:3000/shifts')
    cy.contains('Welcome TestName')
  })

  it.skip('Alerts the user if wrong email or password is entered', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[id="sign-in-email-entry"]')
      .type('TestEmail')
    cy.get('[id="sign-in-password-entry"]')
      .type('WrongPassword')
    cy.get('[id="sign-in-submit"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Wrong email or password')
      })
  })

  it('cannot submit if all fields are not filled', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[id="sign-in-email-entry"]')
      .type('TestEmail')
    cy.get('[id=sign-in-submit]').should('be.disabled')
    cy.get('[id="sign-in-password-entry"]')
      .type('TestPassword')

    cy.get('[id="sign-in-submit"]').should('not.be.disabled')
  })
})