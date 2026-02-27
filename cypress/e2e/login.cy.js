describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form correctly', () => {
    cy.get('h1').should('contain', 'Selamat Datang Kembali');
    cy.get('#login-email').should('exist');
    cy.get('#login-password').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Masuk');
  });

  it('should show error message on invalid credentials', () => {
    cy.get('#login-email').type('invalid@email.com');
    cy.get('#login-password').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.auth-card__error', { timeout: 8000 }).should('be.visible');
    cy.url().should('include', '/login');
  });

  it('should navigate to register page when clicking register link', () => {
    cy.contains('Daftar sekarang').click();
    cy.url().should('include', '/register');
    cy.get('h1').should('contain', 'Buat Akun Baru');
  });

  it('should navigate back to login from register page', () => {
    cy.visit('/register');
    cy.contains('Masuk di sini').click();
    cy.url().should('include', '/login');
  });

  it('should login successfully with valid credentials and redirect to home', () => {
    cy.get('#login-email').type(Cypress.env('USER_EMAIL'));
    cy.get('#login-password').type(Cypress.env('USER_PASSWORD'));
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('eq', `${Cypress.config('baseUrl')}/`);
    cy.get('.navbar__username').should('be.visible');
  });
});
