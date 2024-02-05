// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('accessToken', () => {
    cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {
            username: "mor_2314",
            password: "83r5^_"
        },
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200)
        expect(loginResponse.body).to.have.property('token')
        const token = loginResponse.body.token
        // cy.log("Token: " + token)
      
        // Simpan token dalam variabel untuk digunakan dalam permintaan berikutnya
        Cypress.env('accessToken', token)
        return cy.wrap(token)
      })
})