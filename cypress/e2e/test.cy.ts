describe('Login Feature', () => {
	it('should display the login form', function () {
		cy.visit('https://atto-pay.vercel.app/auth/login');
		cy.get('form').should('be.visible');
	});

	it('should show an error message on invalid login', function () {
		// Test case logic to check error message
		cy.visit('https://atto-pay.vercel.app/auth/login');
		cy.get('#login_phone').type('888888888');
		cy.get('#login').submit();

		cy.get('.Toastify__toast-container').should('be.visible');
	});

	it('should log in successfully with valid credentials', function () {
		// Test case logic to check successful login
		cy.visit('https://atto-pay.vercel.app/auth/login');
		cy.get('#login_phone').type('946142412');
		cy.get('#login').submit();

		cy.get('#login_password').type('12345d');
		cy.get('#login').submit();
		cy.url().should('include', '/cabinet');
	});

	it('should display the register form', function () {
		cy.visit('https://atto-pay.vercel.app/auth/login');
		cy.get('#sign_up_link').click();

		cy.url().should('include', '/register');
	});

	it('should show qr', function () {
		cy.visit('https://atto-pay.vercel.app/auth/login');
		cy.get('#show_qr').click();

		cy.get('#myqrcode').should('be.visible');
	});
});
