import './commands';

Cypress.Commands.add('visitLoginPage', () => {
	cy.visit('https://atto-pay.vercel.app/auth/login');
});

Cypress.Commands.add('visitCabinetPage', () => {
	cy.visit('https://atto-pay.vercel.app/auth/login');
	cy.get('#login_phone').type('946142412');
	cy.get('#login').submit();

	cy.get('#login_password').type('12345d');
	cy.get('#login').submit();

	cy.url().should('include', '/cabinet');
});
