Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('#login-email').type(email);
  cy.get('#login-password').type(password);
  cy.get('button[type="submit"]').click();
  cy.url({ timeout: 10000 }).should('eq', `${Cypress.config('baseUrl')}/`);
});
