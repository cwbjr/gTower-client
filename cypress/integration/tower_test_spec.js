/* eslint-disable */
describe('Testing Tower App', () => {
  it('Navbar functionality', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.navbar-brand').should('have.text', 'Campaign Chat');
    cy.get('.header > .navbar').exist;
    cy.get('.navbar > a').should('have.length', 4);
  });

  it('Players page functionality', () => {
    cy.visit('http://localhost:8080/');
    cy.get('[href="/players"]').click();
    cy.url().should('be', '/players');
    cy.get('tbody > tr > th').should('have.length', '3');

    cy.get('.thead-light > tr > :nth-child(1)').should('have.text', '#');
    cy.get('.thead-light > tr > :nth-child(2)').should('have.text', 'Name');
    cy.get('.thead-light > tr > :nth-child(3)').should('have.text', 'Level');
    cy.get('.thead-light > tr > :nth-child(4)').should('have.text', 'Class');
    cy.get('.thead-light > tr > :nth-child(5)').should('have.text', 'Race');
    cy.get('.thead-light > tr > :nth-child(6)').should('have.text', 'Update');
    cy.get('.thead-light > tr > :nth-child(7)').should('have.text', 'Delete');
    cy.get('tbody').should('have.length', 1);
  });

    it('Add player', () => {
      cy.get('.nav-item').click();
      cy.url().should("be", "/add-player");

      cy.get('#name').type('Testing Name');
      cy.get('#tagline').type('Testing tagline on toon');
      cy.get('#level').type('18');
      cy.get('#profession').focus().select('Bard');
      cy.get('#race').focus().select('Human');
      cy.get('#image')
        .type('https://i.pinimg.com/originals/ea/f8/2c/eaf82ca080b0fc6d7e2cfd9ac883253a.png');
      cy.get('.btn').click();
      cy.url().should("be", "/players");
      cy.get('tbody > tr > th').should('have.length', '4');
    });

    it('.click()-enter update player then .type()-enter updated player information then .should()-see if players are greater than three', () => {
      cy.get(':nth-child(4) > :nth-child(6) > a').click();
      cy.url().should("be", "/update-player");

      cy.get('#name').clear().type('UpdateTest Name');
      cy.get('#tagline').clear().type('UpdateTest tagline on toon');
      cy.get('#level').clear().type('19');
      cy.get('#profession').focus().select('Bard');
      cy.get('#race').focus().select('Human');
      cy.get('#image')
        .clear()
        .type('https://i.pinimg.com/originals/ea/f8/2c/eaf82ca080b0fc6d7e2cfd9ac883253a.png');
      cy.get('.card-body > .btn').click();
      cy.url().should("be", "/players");
      cy.get('tbody > tr > th').should('have.length', '4');
    });

    it('.click()-remove player then .should()-see if players are greater than three', () => {
      cy.get(':nth-child(4) > :nth-child(7) > .btn').click();
      cy.get('tbody > tr > th').should('have.length', '3');
    });

    it('.click()-back to Home page', () => {
      cy.get('.navbar > :nth-child(2)').click();
      cy.url().should("be", "/home");
    });
});
