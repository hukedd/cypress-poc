describe('cookie test', () => {

    it('passes', () => {
      // first visit site, set some cookies to dismiss the nonsense popups...
      cy.visit('https://www.hafele.co.uk/en/info/about/360/?hafref=testing123')
      cy.wait(200)
      
      cy.getCookie('CampaignName').should('exist')
      cy.wait(200)

      cy.task('log', 'check cookie')

      cy.getCookie('CampaignName')
        .should('have.property', 'value', 'testing123')
        .then((cookie) => {
            // cookie is an object with "domain", "name" and other properties
            cy.task('log', cookie)
        })
    })
  })