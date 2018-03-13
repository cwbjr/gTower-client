describe('Testing Tower App', () => {
  it('Navbar functionality', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.navbar-brand').should('have.text', 'Campaign Chat');
    // cy.get(':nth-child(1) > .btn__content').click('right', { force: true });
    // cy.get('.navbar > :nth-child(2)').click();
    cy.get('[href="/players"]').click();
  });
  //
  // it('Brochure page with title and button', () => {
  //   cy.get('h1.display-3').should('have.text', 'Player Character Classes');
  //
  //   cy.get('.mx-0 > .btn__content')
  //     .should('have.text', 'Classes')
  //     .click();
  //
  //   cy.visit('/classes');
  // });
  //
  // it('Classes Page', () => {
  //   cy.get('.toolbar__content > :nth-child(1) > .btn__content')
  //     .click('right', { force: true });
  //
  //   cy.get('img').should('be.empty');
  //
  //   cy.get('h2').should('be.empty');
  //
  //   cy.get('p').should('be.empty');
  //
  //
  //   cy.get(':nth-child(2) > .mx-0 > .btn__content')
  //     .click();
  //
  //   cy.get('h2').should('have.text', 'Barbarian');
  //
  //   cy.get('.card__actions > .btn > .btn__content')
  //     .should('have.text', 'Brochure')
  //     .click();
  //
  //   cy.visit('/');
  // });
});
