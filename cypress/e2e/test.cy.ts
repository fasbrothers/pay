describe('Login Feature', () => {
	beforeEach(() => {
		cy.visitLoginPage();
	});

	it('should display the login form', function () {
		cy.get('form').should('be.visible');
	});

	it('should show an error message on invalid phone number', function () {
		cy.get('#login_phone').type('888888888');
		cy.get('#login').submit();

		cy.intercept('POST', '/customer/getlogin').as('login');
		// cy.wait('@login').should(({ request, response }) => {
		// 	expect(request.body).to.have.property('phone', '998888888888');
		// 	expect(response.statusCode).to.eq(404);
		// 	expect(response.body).to.have.property('type', 'USER_NOT_FOUND');
		// });

		cy.get('.Toastify__toast-container').should('be.visible');
	});

	it('should show an error message on invalid password', function () {
		cy.get('#login_phone').type('946142412');
		cy.get('#login').submit();

		cy.get('#login_password').type('12345');
		cy.get('#login').submit();

		cy.intercept('POST', '/customer/login').as('login');

		// cy.wait('@login').should(({ request, response }) => {
		// 	expect(request.body).to.have.property('phone', '998946142412');
		// 	expect(request.body).to.have.property('password', '12345');
		// 	expect(response.statusCode).to.eq(401);
		// 	expect(response.body).to.have.property('type', 'WRONG_PASSWORD');
		// });

		cy.get('.Toastify__toast-container').should('be.visible');
	});

	it('should show an error message and timer on invalid password 3 times', function () {
		cy.get('#login_phone').type('946142412');
		cy.get('#login').submit();

		cy.intercept('POST', '/customer/login').as('login');

		for (let i = 0; i < 3; i++) {
			cy.get('#login_password').type('12345');
			cy.get('#login').submit();
		}

		// cy.wait('@login').should(({ request, response }) => {
		// 	expect(request.body).to.have.property('phone', '998946142412');
		// 	expect(request.body).to.have.property('password', '12345');
		// 	expect(response.statusCode).to.eq(401);
		// 	expect(response.body).to.have.property('type', 'WRONG_PASSWORD');
		// });

		cy.get('.Toastify__toast-container').should('be.visible');
		cy.get('.time__for-block').should('be.visible').contains('02:00');
	});

	it('should log in successfully with valid credentials', function () {
		cy.visitCabinetPage();
	});

	it('should display the register form', function () {
		cy.get('#sign_up_link').click();

		cy.url().should('include', '/register');
	});

	it('should show qr', function () {
		cy.get('#show_qr').click();

		cy.get('#myqrcode').should('be.visible');
	});
});

describe('Cabinet Feature', () => {
	beforeEach(() => {
		cy.visitCabinetPage();
	});

	afterEach(() => {
		cy.clearCookies();
	});

	it('should login successfully and logout', function () {
		cy.get('.profile__picture').click();
		cy.get('#logout').click();

		cy.url().should('include', '/auth/login');
	});
});
