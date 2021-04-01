describe('Getting gists', () => {
  before(() => {
    cy.visit('http://localhost:3000');

    cy.get('#user-search')
      .clear();

    cy.get('#user-search')
      .type('ErikHellman');

    cy.get('.user-selection-list')
      .find('#item-ErikHellman')
      .click();
  });

  it('should be able to get a full list of public Gists by a username typed at the search input.', () => { 
    cy.get('.user-gists-results-container')
      .find('.card')
      .its('length')
      .should('be.gte', 1);
  });

  it('should have the respective tags/badges for filetypes', () => { 
    cy.get('.user-gists-results-container')
      .find('.card .badges .badge')
      .its('length')
      .should('be.gte', 1);
  });

  it('should have avatar with username as alt attribute text of the last 3 users who forked it with avatar linking to the fork.', () => {
    cy.get('.user-gists-results-container')
      .find('.card .forks .fork')
      .its('length')
      .should('be.gte', 1);
  });
});